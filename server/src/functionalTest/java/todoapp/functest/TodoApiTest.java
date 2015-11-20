package todoapp.functest;

import com.google.appengine.api.urlfetch.HTTPMethod;
import com.google.appengine.api.urlfetch.HTTPRequest;
import com.google.appengine.api.urlfetch.HTTPResponse;
import com.google.appengine.api.urlfetch.URLFetchService;
import com.google.appengine.api.urlfetch.URLFetchServiceFactory;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.appengine.tools.development.testing.LocalURLFetchServiceTestConfig;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.net.URL;

import static org.junit.Assert.*;
import static org.hamcrest.Matchers.*;

public class TodoApiTest {

    private static String BASE_URL = "http://localhost:8080/_ah/api";

    private LocalServiceTestHelper helper = new LocalServiceTestHelper(
        new LocalURLFetchServiceTestConfig()
    );

    URLFetchService service;

    @Before
    public void setUp() {
        helper.setUp();
        service = URLFetchServiceFactory.getURLFetchService();
    }

    @After
    public void tearDown() {
        helper.tearDown();
    }

    @Test
    public void test_api_push() throws Exception {
        HTTPRequest request = new HTTPRequest(new URL(BASE_URL + "/todo/v1/push"), HTTPMethod.POST);
        request.setPayload("body=hoge".getBytes());
        HTTPResponse response = service.fetch(request);
        assertThat(response.getResponseCode(), is(200));
    }

    @Test
    public void test_api_fetch() throws Exception {
        HTTPResponse response = service.fetch(new URL(BASE_URL + "/todo/v1/fetch"));
        assertThat(response.getResponseCode(), is(200));
    }
}