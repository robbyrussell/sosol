<?xml version="1.0"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" version="2.0">
  
  <xsl:import href="../pn/start-div-portlet.xsl"/>
  
  <!-- Text edition div -->
  <xsl:template match="tei:div[@type = 'edition']" priority="1">
     <div class="commentary" id="edition">
        <!-- Found in htm-tpl-lang.xsl -->
        <xsl:call-template name="attr-lang"/>
        <xsl:apply-templates/>

        <!-- Apparatus creation: look in tpl-apparatus.xsl for documentation and templates -->
        <xsl:if test="$apparatus-style = 'ddbdp'">
           <!-- Framework found in htm-tpl-apparatus.xsl -->
           <xsl:call-template name="tpl-apparatus"/>
        </xsl:if>

     </div>
  </xsl:template>
  
  <!-- Anonymous blocks -->
  <xsl:template match="tei:ab">
      <div class="textpart">
         <ul>
           <xsl:apply-templates/>
         </ul>
      </div>
  </xsl:template>

  <!-- Textpart div -->
  <xsl:template match="tei:div[@type='textpart']" priority="1">
     <xsl:variable name="div-loc">
        <xsl:for-each select="ancestor::tei:div[@type='textpart']">
           <xsl:value-of select="@n"/>
           <xsl:text>-</xsl:text>
        </xsl:for-each>
     </xsl:variable>
     <div class="commentary textpart">
       <span class="textpartnumber" id="ab{$div-loc}{@n}">
          <!-- add ancestor textparts -->
          <xsl:if test="($leiden-style = 'ddbdp' or $leiden-style = 'sammelbuch') and @subtype">
             <xsl:value-of select="@subtype"/>
             <xsl:text> </xsl:text>
          </xsl:if>
          <xsl:if test="@n">
             <xsl:value-of select="@n"/>
          </xsl:if>
       </span>
       <xsl:apply-templates/>
     </div>
  </xsl:template>
  
  <!-- line breaks -->
  <xsl:template match="tei:lb">
    <li class="line clickable" id="{@xml:id}"/><span class="hidden" id="n-{@xml:id}"><xsl:value-of select="@n"/></span>
  </xsl:template>
  
</xsl:stylesheet>