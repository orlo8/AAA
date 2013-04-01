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
		Gson gson = new Gson();

		//PreparedStatement findByPartyAndRegion = null;
		PreparedStatement findByParty = null;
		PreparedStatement findByRegion = null;
		PreparedStatement findByName = null;
		PreparedStatement findAll = null;

		Connection c = null;
		try {

			c = DriverManager
					.getConnection("jdbc:google:rdbms://aaaandmebaas:aaadb");
			
			//findByPartyAndRegion = c
				//	.prepareStatement("SELECT id, nimi FROM valimised.partei WHERE partei=? AND piirkond=?");
			findByParty = c
					.prepareStatement("SELECT id, nimi FROM valimised.partei WHERE partei=?");
			findByRegion = c
					.prepareStatement("SELECT id, nimi FROM valimised.partei WHERE piirkond=?");
			findByName = c
					.prepareStatement("SELECT id, nimi FROM valimised.partei WHERE nimi=?");
			findAll = c
					.prepareStatement("SELECT id, nimi FROM valimised.partei");

			ResultSet rs = null;

//			if (request.getParameterMap().containsKey("piirkond")
//					&& request.getParameterMap().containsKey("partei")) {
//				findByPartyAndRegion.setString(1,
//						request.getParameter("partei"));
//				findByPartyAndRegion.setString(2,
//						request.getParameter("piirkond"));
//				rs = findByPartyAndRegion.executeQuery();
			if (request.getParameterMap().containsKey("piirkond")) {
				findByRegion.setString(1, request.getParameter("piirkond"));
				rs = findByRegion.executeQuery();
			} else if (request.getParameterMap().containsKey("partei")) {
				findByParty.setString(1, request.getParameter("partei"));
				rs = findByParty.executeQuery();
			} else if (request.getParameterMap().containsKey("nimi")) {
				findByName.setString(1, request.getParameter("nimi"));
				rs = findByName.executeQuery();
			} else {
				rs = findAll.executeQuery();
			}

			ArrayList<Kandidaat> kandidaadid = new ArrayList<Kandidaat>();
			while (rs.next()) {
				//piirkonna j‰rgi - ¸leval piirkond nt. Harjumaa, all erakond, h‰‰lte arv?
				//riigi j‰rgi - kogu riik, erakond 1 ,h‰‰li..
				//partei j‰rgi - partei 1, h‰‰li
				//number nimi, partei, piirkond, h‰‰li
				
				Partei partei = new Partei(rs.getInt("partei_id"),
						rs.getString("partei_nimi"));
				Isik isik = new Isik(rs.getInt("isiku_id"),
						rs.getString("isiku_nimi"));
				Piirkond piirkond = new Piirkond(rs.getInt("piirkonna_id"),
						rs.getString("piirkonna_nimi"));
				kandidaadid.add(new Kandidaat(rs.getInt("kandidaadi_ID"),
						partei, piirkond, isik));
			}
			out.println(gson.toJson(kandidaadid));

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		out.close();
	}
}
