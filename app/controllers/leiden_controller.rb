class LeidenController < ApplicationController
  
  def xmlAjax
    
    xml2conv = (params[:xml])
    begin
      leidenback = Leiden.xml_leiden_plus(xml2conv)
      render :text => "#{leidenback}"
    rescue RXSugar::XMLParseError => parse_error
      #insert **ERROR** into content to help user find it - subtract 1 for offset from 0
      parse_error.content.insert((parse_error.column-1), "**ERROR**")
      render :text => "Error at column #{parse_error.column} #{parse_error.content}"
    end
  end
  
  def leiden2xml
    
    leiden2conv = (params[:leiden])
    begin
      xmlback = Leiden.leiden_plus_xml(leiden2conv)
      render :text => "#{xmlback}"
    rescue RXSugar::NonXMLParseError => parse_error
      #insert **ERROR** into content to help user find it - subtract 1 for offset from 0
      parse_error.content.insert((parse_error.column-1), "**ERROR**")
      render :text => "Error at column #{parse_error.column} #{parse_error.content}"
    end
    
    
  end

end
