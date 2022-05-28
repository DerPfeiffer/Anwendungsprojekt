package de.fom.project.onlineshop.backend.actuator;

import de.fom.project.onlineshop.backend.MockDataLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.endpoint.web.annotation.RestControllerEndpoint;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Component
@RestControllerEndpoint(id = "addons")
public class ActuatorCustomEndpoints {

    private final MockDataLoader dataLoader;
    
    @Autowired
    ActuatorCustomEndpoints(MockDataLoader dataLoader){
        this.dataLoader = dataLoader;
    }
    
    @SuppressWarnings("rawtypes")
    @PostMapping("/resetData")
    public @ResponseBody ResponseEntity resetData() {
        try {
            dataLoader.deleteData();
            dataLoader.loadData();
            return new ResponseEntity<>("Data reset successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Data reset couldn't be executed. Error:" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
