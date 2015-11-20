package todoapp.api;

import java.util.List;
import javax.inject.Named;

import com.google.appengine.api.datastore.Entity;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiClass;
import com.google.api.server.spi.config.ApiMethod;
import todoapp.service.TodoService;

@Api(name = "todo")
@ApiClass
public class TodoApi {

    TodoService service = new TodoService();

    @ApiMethod(path = "fetch", httpMethod = "GET")
    public List<Entity> fetch() {
        return service.findAll();
    }

    @ApiMethod(path = "push", httpMethod = "POST")
    public Entity push(@Named("body") String body) throws Exception {
        return service.put(body);
    }
}
