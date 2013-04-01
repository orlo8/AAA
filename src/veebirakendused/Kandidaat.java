package veebirakendused;

public class Kandidaat {
	private int id;
	private Partei partei;
	private Piirkond piirkond;
	private Isik isik;
	
	
	
	public Kandidaat(int id, Partei partei, Piirkond piirkond, Isik isik) {
		this.id = id;
		this.partei = partei;
		this.piirkond = piirkond;
		this.isik = isik;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Partei getPartei() {
		return partei;
	}
	public void setPartei(Partei partei) {
		this.partei = partei;
	}
	public Piirkond getPiirkond() {
		return piirkond;
	}
	public void setPiirkond(Piirkond piirkond) {
		this.piirkond = piirkond;
	}
	public Isik getIsik() {
		return isik;
	}
	public void setIsik(Isik isik) {
		this.isik = isik;
	}
}
