package veebirakendused;

import java.io.Serializable;

public class Partei implements Serializable{
	private int id;
	private String nimi;
	
	
	
	public Partei(int id, String nimi) {
		this.id = id;
		this.nimi = nimi;
	}
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNimi() {
		return nimi;
	}
	public void setNimi(String nimi) {
		this.nimi = nimi;
	}
}
