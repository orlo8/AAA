package com.example.tests;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

import junit.framework.TestCase;

public class kandidaadiotsingTest extends TestCase{
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", "http://aaaveeb.appspot.com/?leht=kandidaadid.html");
		selenium.start();
	}

	@Test
	public void testKandidaadiotsing() throws Exception {
		selenium.open("http://aaaveeb.appspot.com/?leht=kandidaadid.html");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isTextPresent("Nimekiri")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isElementPresent("//table/tbody/tr/td[contains(text(), 'Vladimir')]")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		Thread.sleep(2500);
		selenium.type("id=nimeotsing", "meelis");
		selenium.typeKeys("id=nimeotsing", "meelis");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isElementPresent("css=div.autocomplete-suggestion")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		selenium.click("css=div.autocomplete-suggestion");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (!selenium.isElementPresent("//table/tbody/tr/td[contains(text(), 'Vladimir')]")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isElementPresent("//table/tbody/tr/td[contains(text(), 'Meelis')]")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		selenium.open("http://aaaveeb.appspot.com/?leht=kandidaadid.html");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isElementPresent("//table/tbody/tr/td[contains(text(), 'Mari')]")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		selenium.type("id=erakonnaotsing", "Erakond1");
		selenium.type("id=ringkonnaotsing", "Pärnumaa");
		selenium.click("id=otsikandidaati");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (!selenium.isElementPresent("//table/tbody/tr/td[contains(text(), 'Mari')]")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isElementPresent("//table/tbody/tr/td[contains(text(), 'Vladimir')]")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		selenium.type("id=erakonnaotsing", "Erakond1");
		selenium.type("id=ringkonnaotsing", "Pärnumaa");
		selenium.click("id=otsikandidaati");
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
