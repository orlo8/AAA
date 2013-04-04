package veebirakendused;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.*;
import java.util.ArrayList;

import com.google.gson.Gson;

public class Tulemused extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		PrintWriter out = response.getWriter();
		response.setContentType("application/json; charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		Gson gson = new Gson();
		
		PreparedStatement findAll = null;

		Connection c = null;
		try {
			c = DriverManager
					.getConnection("jdbc:google:rdbms://aaaandmebaas:aaadb/valimised");
			findAll = c
					.prepareStatement("SELECT Kandidaat.id AS kandidaat_id, Partei.id AS partei_id, Partei.nimi AS partei_nimi, "
							+ "Isik.id AS isik_id, Isik.nimi AS isik_nimi, Piirkond.id AS piirkond_id, Piirkond.nimi AS piirkond_nimi, Count(Haal.kandidaat) AS haalte_arv FROM Partei "
							+ "INNER JOIN  Kandidaat ON Partei.id=Kandidaat.partei "
							+ "INNER JOIN Isik ON Kandidaat.isik=Isik.id "
							+ "INNER JOIN Piirkond ON Kandidaat.Piirkond=Piirkond.id "
							+ "LEFT JOIN Haal ON Haal.Kandidaat = Kandidaat.id "
							+ "GROUP BY Isik.id ORDER BY haalte_arv DESC");
			ResultSet rs = null;
			rs = findAll.executeQuery();
			ArrayList<Haal> haaled = new ArrayList<Haal>();
			while (rs.next()) {

				Partei partei = new Partei(rs.getInt("partei_id"),
						rs.getString("partei_nimi"));
				Isik isik = new Isik(rs.getInt("isik_id"),
						rs.getString("isik_nimi"));
				Piirkond piirkond = new Piirkond(rs.getInt("piirkond_id"),
						rs.getString("piirkond_nimi"));
				int haali = rs.getInt("haalte_arv");
				haaled.add(new Haal(haali, new Kandidaat(rs
						.getInt("kandidaat_id"), partei, piirkond, isik)));

			}
			out.println(gson.toJson(haaled));

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			out.println(e);
		}
		out.close();
	}
}
