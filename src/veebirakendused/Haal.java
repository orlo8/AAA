package veebirakendused;

public class Haal {
	private int haali;
	private Kandidaat kandidaat;

	public Haal(int haali, Kandidaat kandidaat) {
		this.haali = haali;
		this.kandidaat = kandidaat;
	}

	public int getHaali() {
		return haali;
	}

	public void setHaali(int haali) {
		this.haali = haali;
	}

	public Kandidaat getKandidaat() {
		return kandidaat;
	}

	public void setKandidaat(Kandidaat kandidaat) {
		this.kandidaat = kandidaat;
	}
}
