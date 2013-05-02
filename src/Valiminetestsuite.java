import com.example.tests.Valimine;
import com.example.tests.kandidaadiotsingTest;

import junit.framework.Test;
import junit.framework.TestSuite;

public class Valiminetestsuite {

  public static Test suite() {
    TestSuite suite = new TestSuite();
    suite.addTestSuite(kandidaadiotsingTest.class);
    suite.addTestSuite(Valimine.class);
    return suite;
  }

  public static void main(String[] args) {
    junit.textui.TestRunner.run(suite());
  }
}
