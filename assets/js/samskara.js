function initialize(){if("object"==typeof admin_info){document.getElementById("admin_name").innerHTML=admin_info.name,"string"!=typeof admin_info.profile?document.getElementById("profile_image").style.display="none":document.getElementById("profile_image").style.backgroundImage="url('"+admin_info.profile+"')";var e=document.getElementById("admin_description");if(e.appendChild(document.createTextNode(admin_info.description)),e.appendChild(document.createElement("br")),"string"==typeof admin_info.address){var n=document.createElement("small");n.innerHTML='<i class="fas fa-map-marker-alt"></i> '+admin_info.address,e.appendChild(n)}"object"==typeof admin_info.social?("string"==typeof admin_info.social.email?document.getElementById("admin_email").href="mailto:"+admin_info.social.email:document.getElementById("admin_email").style.display="none","string"==typeof admin_info.social.twitter?document.getElementById("admin_twitter").href=admin_info.social.twitter:document.getElementById("admin_twitter").style.display="none","string"==typeof admin_info.social.facebook?document.getElementById("admin_facebook").href=admin_info.social.facebook:document.getElementById("admin_facebook").style.display="none"):document.getElementById("admin_social").style.display="none",document.getElementById("admin-info").style.display="inherit"}}