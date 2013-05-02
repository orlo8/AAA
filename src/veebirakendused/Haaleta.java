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

public class Haaleta extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/json; charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		Gson gson = new Gson();

		PreparedStatement haaletaQuery = null;
		PreparedStatement tyhistaHaalQuery = null;
		PreparedStatement kasHaaletanudQuery = null;
		Connection c = null;
		ResultSet rs = null;
		try {
			c = DriverManager
					.getConnection("jdbc:google:rdbms://aaaandmebaas:aaadb/valimised");

			
			haaletaQuery = c
					.prepareStatement("INSERT INTO Haal (kandidaat, isik) SELECT ?, ? FROM dual WHERE NOT EXISTS" + 
							" (SELECT isik FROM Haal WHERE isik=? )");
			kasHaaletanudQuery=c
					.prepareStatement("SELECT COUNT(Haal.isik) AS tulemusi FROM Haal WHERE isik=? ");
			tyhistaHaalQuery = c
					.prepareStatement("DELETE FROM Haal WHERE isik=? ");

			if (request.getParameterMap().containsKey("kashaaletatud") && request.getParameterMap().containsKey("isik")) {
				kasHaaletanudQuery.setInt(1,
						Integer.parseInt(request.getParameter("isik")));
				rs=kasHaaletanudQuery.executeQuery();
				String [] haaletatud={"haaletatud"};
				String [] pole={"pole"};
				
				if(rs.next()){
					if(rs.getInt("tulemusi")>0){
						out.print(gson.toJson(haaletatud));
					}
					else{
						out.print(gson.toJson(pole));
					};
				}
			}

			else if (request.getParameterMap().containsKey("isik")
					&& request.getParameterMap().containsKey("tyhista")) {
				tyhistaHaalQuery.setInt(1,
						Integer.parseInt(request.getParameter("isik")));
				String [] tyhistatud={"tyhistatud"};
				out.print(gson.toJson(tyhistatud));
				tyhistaHaalQuery.executeQuery();
				
			}
			else if (request.getParameterMap().containsKey("isik")
					&& request.getParameterMap().containsKey("kandidaat")) {
				haaletaQuery.setInt(1,
						Integer.parseInt(request.getParameter("kandidaat")));
				haaletaQuery.setInt(2,
						Integer.parseInt(request.getParameter("isik")));
				haaletaQuery.setInt(3,
						Integer.parseInt(request.getParameter("isik")));
				String [] haaletatud={"haaletatud"};
				out.print(gson.toJson(haaletatud));
				haaletaQuery.executeQuery();
				
			}
			
			

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			//out.println(e);
		}
	}
}
