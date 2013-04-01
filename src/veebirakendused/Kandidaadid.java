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

public class Kandidaadid extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json; charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		
		Gson gson = new Gson();

		PreparedStatement findByPartyAndRegion = null;
		PreparedStatement findByParty = null;
		PreparedStatement findByRegion = null;
		PreparedStatement findByName = null;
		PreparedStatement findAll = null;

		Connection c = null;
		try {

			c = DriverManager
					.getConnection("jdbc:google:rdbms://aaaandmebaas:aaadb/valimised");

			findByPartyAndRegion = c
					.prepareStatement("SELECT Kandidaat.id AS kandidaat_id, Partei.id AS partei_id, Partei.nimi AS partei_nimi, "
							+ "Isik.id AS isik_id, Isik.nimi AS isik_nimi, Piirkond.id AS piirkond_id, Piirkond.nimi AS piirkond_nimi FROM Partei "
							+ "INNER JOIN  Kandidaat ON Partei.id=Kandidaat.partei "
							+ "INNER JOIN Isik ON Kandidaat.isik=Isik.id "
							+ "INNER JOIN Piirkond ON Kandidaat.Piirkond=Piirkond.id "
							+ "WHERE Partei.nimi LIKE ? AND Piirkond.nimi LIKE ?");
			findByParty = c
					.prepareStatement("SELECT Kandidaat.id AS kandidaat_id, Partei.id AS partei_id, Partei.nimi AS partei_nimi, "
							+ "Isik.id AS isik_id, Isik.nimi AS isik_nimi, Piirkond.id AS piirkond_id, Piirkond.nimi AS piirkond_nimi FROM Partei "
							+ "INNER JOIN  Kandidaat ON Partei.id=Kandidaat.partei "
							+ "INNER JOIN Isik ON Kandidaat.isik=Isik.id "
							+ "INNER JOIN Piirkond ON Kandidaat.Piirkond=Piirkond.id "
							+ "WHERE Partei.nimi LIKE ?");
			findByRegion = c
					.prepareStatement("SELECT Kandidaat.id AS kandidaat_id, Partei.id AS partei_id, Partei.nimi AS partei_nimi, "
							+ "Isik.id AS isik_id, Isik.nimi AS isik_nimi, Piirkond.id AS piirkond_id, Piirkond.nimi AS piirkond_nimi FROM Partei "
							+ "INNER JOIN  Kandidaat ON Partei.id=Kandidaat.partei "
							+ "INNER JOIN Isik ON Kandidaat.isik=Isik.id "
							+ "INNER JOIN Piirkond ON Kandidaat.Piirkond=Piirkond.id "
							+ "WHERE Piirkond.nimi LIKE ?");
			findByName = c
					.prepareStatement("SELECT Kandidaat.id AS kandidaat_id, Partei.id AS partei_id, Partei.nimi AS partei_nimi, "
							+ "Isik.id AS isik_id, Isik.nimi AS isik_nimi, Piirkond.id AS piirkond_id, Piirkond.nimi AS piirkond_nimi FROM Partei "
							+ "INNER JOIN  Kandidaat ON Partei.id=Kandidaat.partei "
							+ "INNER JOIN Isik ON Kandidaat.isik=Isik.id "
							+ "INNER JOIN Piirkond ON Kandidaat.Piirkond=Piirkond.id "
							+ "WHERE Isik.nimi LIKE ?");
			findAll = c
					.prepareStatement("SELECT Kandidaat.id AS kandidaat_id, Partei.id AS partei_id, Partei.nimi AS partei_nimi, "
							+ "Isik.id AS isik_id, Isik.nimi AS isik_nimi, Piirkond.id AS piirkond_id, Piirkond.nimi AS piirkond_nimi FROM Partei "
							+ "INNER JOIN  Kandidaat ON Partei.id=Kandidaat.partei "
							+ "INNER JOIN Isik ON Kandidaat.isik=Isik.id "
							+ "INNER JOIN Piirkond ON Kandidaat.Piirkond=Piirkond.id");

			ResultSet rs = null;

			if (request.getParameterMap().containsKey("piirkond")
					&& request.getParameterMap().containsKey("partei")) {
				findByPartyAndRegion.setString(1,
						"%" + request.getParameter("partei") + "%");
				findByPartyAndRegion.setString(2,
						"%" + request.getParameter("piirkond") + "%");
				rs = findByPartyAndRegion.executeQuery();
			} else if (request.getParameterMap().containsKey("piirkond")) {
				findByRegion.setString(1,
						"%" + request.getParameter("piirkond") + "%");
				rs = findByRegion.executeQuery();
			} else if (request.getParameterMap().containsKey("partei")) {
				findByParty.setString(1, "%" + request.getParameter("partei")
						+ "%");
				rs = findByParty.executeQuery();
			} else if (request.getParameterMap().containsKey("nimi")) {
				findByName.setString(1, request.getParameter("nimi") + "%");
				rs = findByName.executeQuery();
			} else {
				rs = findAll.executeQuery();
			}

			ArrayList<Kandidaat> kandidaadid = new ArrayList<Kandidaat>();
			while (rs.next()) {
				Partei partei = new Partei(rs.getInt("partei_id"),
						rs.getString("partei_nimi"));
				Isik isik = new Isik(rs.getInt("isik_id"),
						rs.getString("isik_nimi"));
				Piirkond piirkond = new Piirkond(rs.getInt("piirkond_id"),
						rs.getString("piirkond_nimi"));
				kandidaadid.add(new Kandidaat(rs.getInt("kandidaat_id"),
						partei, piirkond, isik));
			}
			out.println(gson.toJson(kandidaadid));

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			out.println(e);
		}

		out.close();
	}
}
