package todoapp.service;

import com.google.api.server.spi.response.InternalServerErrorException;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;


import static org.junit.Assert.*;
import static org.hamcrest.Matchers.*;

public class TodoServiceTest {

    @Rule
    public ExpectedException rule = ExpectedException.none();

    private LocalServiceTestHelper helper = new LocalServiceTestHelper(
        new LocalDatastoreServiceTestConfig()
    );

    @Before
    public void setUp() {
        helper.setUp();
    }

    @After
    public void tearDown() {
        helper.tearDown();
    }

    @Test
    public void test_put() throws Exception {
        TodoService service = new TodoService();

        Entity entity = service.put("hoge");
        assertThat(entity, notNullValue());
        assertThat(entity.getProperties(), hasKey("body"));
        assertThat((String) entity.getProperty("body"), is("hoge"));

        rule.expect(InternalServerErrorException.class);
        service.put(null);
    }

    @Test
    public void test_findAll() throws Exception {
        TodoService service = new TodoService();
        assertThat(service.findAll(), hasSize(0));

        Entity entity = service.put("hoge");
        assertThat(entity, notNullValue());
        assertThat(service.findAll(), hasSize(1));
    }
}
