package veebirakendused;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Kandidaadid extends HttpServlet {
	  public void doGet(HttpServletRequest request,
	                    HttpServletResponse response)
	      throws ServletException, IOException {
	    PrintWriter out = response.getWriter();
	    if(request.getParameterMap().containsKey("piirkond")){
		    out.println("Kandidaadid piirkonna "+request.getParameter("piirkond")+" järgi");
	    }
	    else if(request.getParameterMap().containsKey("partei")){
		    out.println("Kandidaadid partei "+request.getParameter("partei")+" järgi");
	    }
	    else if(request.getParameterMap().containsKey("nimi")){
		    out.println("Kandidaadid nime "+request.getParameter("nimi")+" järgi");
	    }
	    else{
		    out.println("Siia tekivad kõik kandidaadid");
	    }
	    
	    out.close();
	  }
	}
