var insertHere = ""; 

//###########################################################################################
// insertFootnote - insert foot note markup into commentary input form
//###########################################################################################
    
function insertFootnote(){

  //get value from page
  
  footnoteText = document.getElementById("insertfootnote_text").value;
  
  if(!(footnoteText.match(/\S/))){ //check for any non-whitespace character
    alert("You must provide text for the foot note");
    return;
  }

  convertXML = '<note type="footnote" xml:lang="en">' + footnoteText + '<\/note>';

  window.opener.getMarkUp(convertXML);
  
  closeHelper();

}

//###########################################################################################
// insertLinkExt - insert external link markup into commentary input form
//###########################################################################################
    
function insertLinkExt(){

  insertAsBibl = 'no';

  //get values from page
  linkExtURL = document.getElementById("insertlink_external").value;
  if(!(linkExtURL.match(/\S/))){ //check for any non-whitespace character
    alert("You must provide and external link");
    return;
  }

  linkFreeText = document.getElementById("insertlink_freetext").value;
  if(!(linkFreeText.match(/\S/))){ //check for any non-whitespace character
    alert("You must provide text for the link");
    return;
  }

  //lowercase URL for consistency and so pass grammar which expects http in lowercase
  if (linkExtURL.match(/^([HhTtPp\:\/]{7})/)){ //check if value is empty or contains space
    convertXML = '<ref target="' + linkExtURL.toLowerCase() + '">' + linkFreeText + '<\/ref>';
  }
  else{
    convertXML = '<ref target="http:\/\/' + linkExtURL.toLowerCase() + '">' + linkFreeText + '<\/ref>';
  }


  if (document.bibl_check.insertlink_check_n.checked == true){
    insertAsBibl = 'yes';
  }

  biblScope = '';

  linkBsPage = document.getElementById("insertlink_bs_page").value;
  if (linkBsPage.match(/\S/)){ //check for any non-whitespace character

    biblScope = biblScope + '<biblScope type="pp">' + linkBsPage + '<\/biblScope>'
    insertAsBibl = 'yes';
  }

  linkBsLine = document.getElementById("insertlink_bs_line").value;
  if (linkBsLine.match(/\S/)){ //check for any non-whitespace character

    biblScope = biblScope + '<biblScope type="ll">' + linkBsLine + '<\/biblScope>'
    insertAsBibl = 'yes';
  }

  linkBsVol = document.getElementById("insertlink_bs_vol").value;
  if (linkBsVol.match(/\S/)){ //check for any non-whitespace character

    biblScope = biblScope + '<biblScope type="vol">' + linkBsVol + '<\/biblScope>'
    insertAsBibl = 'yes';
  }

  linkBsIssue = document.getElementById("insertlink_bs_issue").value;
  if (linkBsIssue.match(/\S/)){ //check for any non-whitespace character

    biblScope = biblScope + '<biblScope type="issue">' + linkBsIssue + '<\/biblScope>'
    insertAsBibl = 'yes';
  }

  linkBsChap = document.getElementById("insertlink_bs_chapter").value;
  if (linkBsChap.match(/\S/)){ //check for any non-whitespace character

    biblScope = biblScope + '<biblScope type="chap">' + linkBsChap + '<\/biblScope>'
    insertAsBibl = 'yes';
  }


  if (insertAsBibl == 'yes'){
    convertXML = ' <listBibl><bibl>' + convertXML + biblScope + '</bibl></listBibl>';
  }

  window.opener.getMarkUp(convertXML);
  
  closeHelper();
}

//###########################################################################################
// insertLinkPN - insert a link to PN entry markup into commentary input form
//###########################################################################################
    
function insertLinkPN(){

    editpass = "yes";
    insertAsBibl = 'no';

    //get values from page
    linkVolume = document.getElementById("volume_number").value;
    linkDocNum = document.getElementById("document_number").value;

    linkFreeText = document.getElementById("insertlink_freetext").value;
    if(!(linkFreeText.match(/\S/))){ //check for any non-whitespace character
      alert("You must provide text for the link");
      return;
    }

    collectionType = document.getElementById("IdentifierClass").value;
    
    switch(collectionType)
    {
    case "DDBIdentifier":
      linkCollection = document.getElementById("DDBIdentifierCollectionSelect").value;
      if(!(linkCollection.match(/\S/)) || (!(linkDocNum.match(/\S/)))){ //check for any non-whitespace character
        alert("You must select a collection and document number at a minimum for the link");
        return;
      }
      pnRef = "ddbdp/";
      convertXML = '<ref target="http:\/\/papyri.info\/' + pnRef + linkCollection + ';' + linkVolume + ';' + linkDocNum + '">' + linkFreeText + '<\/ref>';
      break;
    case "HGVIdentifier":
      linkCollection = document.getElementById("HGVIdentifierCollectionSelect").value;
      if(!(linkCollection.match(/\S/)) || (!(linkDocNum.match(/\S/)))){ //check for any non-whitespace character
        alert("You must select a collection and document number at a minimum for the link");
        return;
      }
      pnRef = "hgv/";
      if(linkVolume.match(/\S/)){ //check for any non-whitespace character
        identifier = 'papyri.info\/' + pnRef + linkCollection.replace(' ', '_') + '_' + linkVolume + '_' + linkDocNum
      }
      else{
        identifier = 'papyri.info\/' + pnRef + linkCollection.replace(' ', '_') + '_' + linkDocNum
      }

      convertXML = '<ref target="http:\/\/' + getHGVNumber(identifier) + '">' + linkFreeText + '<\/ref>';
      break;
    case "APISIdentifier":
      linkCollection = document.getElementById("APISIdentifierCollectionSelect").value;
      if(!(linkCollection.match(/\S/)) || (!(linkDocNum.match(/\S/)))){ //check for any non-whitespace character
        alert("You must select a collection and document number at a minimum for the link");
        return;
      }
      pnRef = "apis/";
      convertXML = '<ref target="http:\/\/papyri.info\/' + pnRef + linkCollection + '.apis.' + linkDocNum + '">' + linkFreeText + '<\/ref>';
      break;
    default: 
      alert("The following value needs to be added to the insertLinkPN Javascript function - " + collectionType);
    }
      
        
    if (document.bibl_check.insertlink_check_n.checked == true){
      insertAsBibl = 'yes';
    }

    biblScope = '';
    
    linkBsPage = document.getElementById("insertlink_bs_page").value;
    if (linkBsPage.match(/\S/)){ //check for any non-whitespace character
      
      biblScope = biblScope + '<biblScope type="pp">' + linkBsPage + '<\/biblScope>'
      insertAsBibl = 'yes';
    }

    linkBsLine = document.getElementById("insertlink_bs_line").value;
    if (linkBsLine.match(/\S/)){ //check for any non-whitespace character
      
      biblScope = biblScope + '<biblScope type="ll">' + linkBsLine + '<\/biblScope>'
      insertAsBibl = 'yes';
    }

    linkBsVol = document.getElementById("insertlink_bs_vol").value;
    if (linkBsVol.match(/\S/)){ //check for any non-whitespace character
      
      biblScope = biblScope + '<biblScope type="vol">' + linkBsVol + '<\/biblScope>'
      insertAsBibl = 'yes';
    }

    linkBsIssue = document.getElementById("insertlink_bs_issue").value;
    if (linkBsIssue.match(/\S/)){ //check for any non-whitespace character
      
      biblScope = biblScope + '<biblScope type="issue">' + linkBsIssue + '<\/biblScope>'
      insertAsBibl = 'yes';
    }

    linkBsChap = document.getElementById("insertlink_bs_chapter").value;
    if (linkBsChap.match(/\S/)){ //check for any non-whitespace character
      
      biblScope = biblScope + '<biblScope type="chap">' + linkBsChap + '<\/biblScope>'
      insertAsBibl = 'yes';
    }
    
    
    if (insertAsBibl == 'yes'){
      convertXML = ' <listBibl><bibl>' + convertXML + biblScope + '</bibl></listBibl>';
    }

    window.opener.getMarkUp(convertXML);
    
    closeHelper();
  }
   
//###########################################################################################
// closeHelper - close the helper input window
//###########################################################################################
    
function closeHelper()
{
  
  window.close(); 
}