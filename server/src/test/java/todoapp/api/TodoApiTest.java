package todoapp.api;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;
import static org.hamcrest.Matchers.*;

public class TodoApiTest {

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
    public void test_fetch() throws Exception {
        TodoApi api = new TodoApi();
        api.service.put("hoge");
        assertThat(api.fetch(), hasSize(1));
    }

    @Test
    public void test_push() throws Exception {
        TodoApi api = new TodoApi();
        Entity entity = api.push("hoge");
        assertThat(entity, notNullValue());
    }
}
