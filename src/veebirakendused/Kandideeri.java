package veebirakendused;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class Kandideeri extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/json; charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		Gson gson = new Gson();

		PreparedStatement kandideeriQuery = null;

		Connection c = null;
		try {
			c = DriverManager
					.getConnection("jdbc:google:rdbms://aaaandmebaas:aaadb/valimised");

			kandideeriQuery = c
					.prepareStatement("IF NOT EXISTS (SELECT isik FROM Kandidaat WHERE isik=?) "
							+ "INSERT INTO Kandidaat (partei,piirkond,isik) VALUES(?,?,?)");
			ResultSet rs = null;
			if (request.getParameterMap().containsKey("isik")
					&& request.getParameterMap().containsKey("partei")
					&& request.getParameterMap().containsKey("piirkond")) {
				
				kandideeriQuery.setInt(1,
						Integer.parseInt(request.getParameter("isik")));
				kandideeriQuery.setInt(2,
						Integer.parseInt(request.getParameter("partei")));
				kandideeriQuery.setInt(3,
						Integer.parseInt(request.getParameter("piirkond")));
				kandideeriQuery.setInt(4,
						Integer.parseInt(request.getParameter("isik")));
				rs = kandideeriQuery.executeQuery();
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			out.println(e);
		}
	}

}
