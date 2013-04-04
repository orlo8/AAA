package veebirakendused;

import java.io.Serializable;
import java.util.ArrayList;

public class Suggestion implements Serializable{
	private ArrayList<String> suggestions=new ArrayList<String>();

	public void add(String string){
		suggestions.add(string);
	}



}
