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
		    out.println("Kandidaadid piirkonna "+request.getParameter("piirkond")+" j�rgi");
	    }
	    else if(request.getParameterMap().containsKey("partei")){
		    out.println("Kandidaadid partei "+request.getParameter("partei")+" j�rgi");
	    }
	    else if(request.getParameterMap().containsKey("nimi")){
		    out.println("Kandidaadid nime "+request.getParameter("nimi")+" j�rgi");
	    }
	    else{
		    out.println("Siia tekivad k�ik kandidaadid");
	    }
	    
	    out.close();
	  }
	}
