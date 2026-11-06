export default function LeadAttribution() {
  return (
    <script type="module">
      {`(function(){
        try {
          var key='sd_attr';
          var maxAge=90*24*60*60;
          var params=['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid','gbraid','wbraid','msclkid'];
          var ignored=/(^|\\.)(seedlingschools\\.com|atomtech\\.in|ndpsgroup\\.com|paynetz\\.in)$/i;
          var url=new URL(window.location.href);
          var touch={};
          params.forEach(function(name){var value=url.searchParams.get(name);if(value)touch[name]=value.slice(0,200);});
          var referrer='';
          if(document.referrer){
            try {if(!ignored.test(new URL(document.referrer).hostname))referrer=document.referrer.slice(0,500);} catch(e) {}
          }
          var existing=null;
          try {
            var cookie=document.cookie.split('; ').find(function(item){return item.indexOf(key+'=')===0;});
            if(cookie)existing=JSON.parse(decodeURIComponent(cookie.slice(key.length+1)));
          } catch(e) {}
          var hasNewSource=Object.keys(touch).length>0||referrer!=='';
          if(existing&&existing.first&&!hasNewSource)return;
          if(referrer)touch.referrer=referrer;
          touch.landing_page=(url.origin+url.pathname+url.search).slice(0,500);
          touch.ts=new Date().toISOString();
          var host=window.location.hostname;
          var domain=host==='seedlingschools.com'||host.endsWith('.seedlingschools.com')?'; Domain=.seedlingschools.com':'';
          var secure=window.location.protocol==='https:'?'; Secure':'';
          var value=existing&&existing.first?{first:existing.first,last:touch}:{first:touch,last:touch};
          document.cookie=key+'='+encodeURIComponent(JSON.stringify(value))+'; Max-Age='+maxAge+'; Path=/; SameSite=Lax'+domain+secure;
        } catch(e) {}
      })();`}
    </script>
  );
}
