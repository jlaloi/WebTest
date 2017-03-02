package com.julien.webtest;


import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Calendar;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by JLALO on 20/02/2017.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class Server {

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }

    @Test
    public void loginAndCreateTest() throws Exception {
        MvcResult loginResult = mockMvc
                .perform(formLogin("/login.html").user("user").password("password"))
                .andExpect(authenticated())
                .andReturn();

        MockHttpSession httpSession = MockHttpSession.class.cast(loginResult.getRequest().getSession(false));

        // NEVER DO THAT JUST AN EXAMPLE ;)
        String customTatane = "Test" + Calendar.getInstance().getTime().getTime();

        // CREATE TATANE
        MvcResult mvcCreate = mockMvc
                .perform(post("/tatane").contentType(MediaType.APPLICATION_JSON).content("{\"name\": \"" + customTatane + "\"}").session(httpSession))
                .andExpect(status().isOk())
                .andReturn();
        JSONObject createObject = new JSONObject(mvcCreate.getResponse().getContentAsString());
        String id = createObject.getString("id");
        assertNotNull(id);

        // FIND TATANE
        MvcResult mvcFind = mockMvc
                .perform(get("/tatane/" + id).session(httpSession))
                .andExpect(status().isOk())
                .andReturn();
        JSONObject findObject = new JSONObject(mvcFind.getResponse().getContentAsString());
        assertEquals(findObject.getString("name"), customTatane);

        // DELETE TATANE
        MvcResult mvcDelete = mockMvc
                .perform(delete("/tatane/" + id).session(httpSession))
                .andExpect(status().isOk())
                .andReturn();
        assertEquals("", mvcDelete.getResponse().getContentAsString());
    }
}
