package com.example.tests;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

import junit.framework.TestCase;

public class Valimine extends TestCase{
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", "http://aaaveeb.appspot.com/?leht=kandidaadid.html");
		
		selenium.start();
		if(selenium.isTextPresent("Oled h‰‰letanud")){//h‰‰le t¸histamine algseisuks
			selenium.click("//table[@id='nimekiri']/tbody/tr/td[contains(text(), 'Meelis')]");
			String  confirmation= selenium.getConfirmation();
		}
	}

	@Test
	public void testValimine() throws Exception {
		selenium.open("http://aaaveeb.appspot.com/?leht=kandidaadid.html");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isTextPresent("Nimekiri")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isElementPresent("//table/tbody/tr/td[contains(text(), 'Meelis')]")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		assertFalse(selenium.isTextPresent("Oled h‰‰letanud"));
		selenium.click("//table[@id='nimekiri']/tbody/tr/td[contains(text(), 'Meelis')]");
		String  confirmation= selenium.getConfirmation();
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isTextPresent("Oled h‰‰letanud")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		selenium.click("//table[@id='nimekiri']/tbody/tr/td[contains(text(), 'Meelis')]");
		confirmation= selenium.getConfirmation();
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (!selenium.isTextPresent("Oled h‰‰letanud")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
