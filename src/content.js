$(function() {

  var ILYhidetimout;

  chrome.storage.sync.get("ILYhideTooltip", function (obj) {
    if (obj.ILYhideTooltip) {
      // don't show, but show badge still
      getPagePreview(document.URL, function(data) {
        chrome.runtime.sendMessage({badgeMessage: data.services_count});
      });
    } else {
      var div = document.createElement('div');
      document.body.appendChild(div);
      div.id = 'ILYtooltip';
      div.style.position = 'fixed';
      div.style.bottom = '20px';
      div.style.left = '20px';
      //div.style.width = '120px';

      var ILYmain = {
        optionsUrl: chrome.extension.getURL('options.html'),
        gearURL: chrome.extension.getURL('assets/images/gearbg.png'),
        closeButtonURL: chrome.extension.getURL('assets/images/close.png'),
        reportURL: "https://my.intricately.com/",
        sendURL: getPagePreview
      };


      $("#ILYtooltip").append('<div class="ILYgear"><img src="' + ILYmain.gearURL + '" width="15"/></div>');
      $("#ILYtooltip").append('<div id="ILYclose"><img src="' + ILYmain.closeButtonURL + '" width="15"/></div>');

      $("#ILYtooltip").on('click', function(e) {
        e.stopPropagation();
        window.open(ILYmain.reportURL, '_blank');
      });

      $("#ILYtooltip").hover(
        function() {
          $("#ILYtooltip .ILYgear").fadeIn(200);
          $("#ILYclose").fadeIn(200);

          clearTimeout(ILYhidetimout);

        }, function() {
          $("#ILYtooltip .ILYgear").fadeOut(200);
          $("#ILYclose").fadeOut(200);

          ILYhidetimout = setTimeout(function(){
            $("#ILYtooltip").fadeOut(200);
          }, 15000);

        }
      );

      $("#ILYclose").on('click', function(e){
        e.stopPropagation();
        $("#ILYtooltip").fadeOut(200);
        clearTimeout(ILYhidetimout);
      });

      $("#ILYtooltip .ILYgear").on('click', function(e){
        e.stopPropagation();
        window.open(ILYmain.optionsUrl, '_blank');
      });

      // get intel on this URL
      //console.log('Getting intel on ' + document.URL);
      getPagePreview(document.URL, function(data) {
        ILYmain.reportURL = data.report_url;
        chrome.runtime.sendMessage({badgeMessage: data.services_count});
        $.each(data.providers, function(index, value) {

          $("#ILYtooltip").fadeIn(200);

          $("#ILYtooltip").append('<div class="ILYvendorLogoContainer"><a href="#" class="ILYtooltip-right" data-tooltipILY="' +  value.name + '"><img class="ILYvendorLogo" src="' + value.url + '" width="30" onError="this.onerror=null; this.parentElement.parentElement.style.display=\'none\';"/></a></div>');
        });

        ILYhidetimout = setTimeout(function() {
         $("#ILYtooltip").fadeOut(200);
        }, 15000);

      });
    }
  });

  function getPagePreview(url, cb) {
    var pagesAPI = 'https://api-ext.intricately.com/api/v1/companies/preview/';  // TODO: handle envs
    var parser = document.createElement('a');
    parser.href = url;
    hostname = parser.hostname;
    finalURL = pagesAPI + hostname;
    $.get(finalURL, cb);
  }

  function DOMtoString(document_root) {
      var html = '',
          node = document_root.firstChild;
      while (node) {
          switch (node.nodeType) {
          case Node.ELEMENT_NODE:
              html += node.outerHTML;
              break;
          case Node.TEXT_NODE:
              html += node.nodeValue;
              break;
          case Node.CDATA_SECTION_NODE:
              html += '<![CDATA[' + node.nodeValue + ']]>';
              break;
          case Node.COMMENT_NODE:
              html += '<!--' + node.nodeValue + '-->';
              break;
          case Node.DOCUMENT_TYPE_NODE:
              // (X)HTML documents are identified by public identifiers
              html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
              break;
          }
          node = node.nextSibling;
      }
      return encodeURIComponent(html);
  }

  // Listen for messages
  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    if (msg.text === 'report_back_dom') {
      this_dom = DOMtoString(document);
      this_url = msg.url;

      // send request to API
      var jax = new XMLHttpRequest();
      jax.open("POST", "https://api-ext.intricately.com/api/v1/utils/page");
      jax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      jax.send("html="+this_dom+"&url="+this_url);
      jax.onreadystatechange = function() { if(jax.readyState==4) { console.log(jax.responseText);  }}

      sendResponse({status: "ok"});
    }

    if (msg.tabId) {
      getPagePreview(document.URL, function(data) {
        chrome.runtime.sendMessage({badgeMessage: data.services_count});
      });
    }
  });

});
