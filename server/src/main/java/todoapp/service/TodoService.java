package todoapp.service;

import com.google.api.server.spi.response.InternalServerErrorException;
import com.google.appengine.api.datastore.*;

import java.util.Date;
import java.util.List;

public class TodoService {

    private DatastoreService service = DatastoreServiceFactory.getDatastoreService();

    public List<Entity> findAll() {
        Query query = new Query("todo").addSort("created_at", Query.SortDirection.ASCENDING);
        return service.prepare(query).asList(FetchOptions.Builder.withDefaults());
    }

    public Entity put(String body) throws InternalServerErrorException {
        if (body == null) {
            throw new InternalServerErrorException("body is null");
        }

        Entity entity = new Entity("todo");
        entity.setProperty("body", body);
        entity.setProperty("created_at", new Date());
        service.put(entity);

        return entity;
    }
}