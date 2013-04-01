package veebirakendused;

public class Haal {
	private int id;
	private Kandidaat kandidaat;
	private Isik isik;
	
	
	
	public Haal(int id, Kandidaat kandidaat, Isik isik) {
		this.id = id;
		this.kandidaat = kandidaat;
		this.isik = isik;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Kandidaat getKandidaat() {
		return kandidaat;
	}
	public void setKandidaat(Kandidaat kandidaat) {
		this.kandidaat = kandidaat;
	}
	public Isik getIsik() {
		return isik;
	}
	public void setIsik(Isik isik) {
		this.isik = isik;
	}
}
