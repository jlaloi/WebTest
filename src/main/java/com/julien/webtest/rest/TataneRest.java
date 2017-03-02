package com.julien.webtest.rest;

import com.julien.webtest.domain.Tatane;
import com.julien.webtest.repository.TataneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by JLALO on 20/02/2017.
 */
@RestController
@RequestMapping("/tatane")
public class TataneRest {

    @Autowired
    private TataneRepository tataneRepository;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    Iterable<Tatane> getTatane() {
        return tataneRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    Tatane addTatane(@RequestBody Tatane tatane) {
        return tataneRepository.save(tatane);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    void delTatane(@PathVariable Long id) {
        tataneRepository.delete(id);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    Tatane findTatane(@PathVariable Long id) {
        return tataneRepository.findOne(id);
    }

}
