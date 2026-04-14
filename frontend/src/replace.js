const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if(file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('d:/SBPL/frontend/src');

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Replace component logic
  // Update visually displayed texts
  content = content.replace(/'Why SBPL'/g, "'Why SBIPL'");
  content = content.replace(/'About SBPL'/g, "'About SBIPL'");
  content = content.replace(/"About SBPL"/g, "\"About SBIPL\"");
  content = content.replace(/'Partner with SBPL'/g, "'Partner with SBIPL'");
  content = content.replace(/>Why SBPL</g, ">Why SBIPL<");
  content = content.replace(/>About SBPL</g, ">About SBIPL<");
  content = content.replace(/>Partner with SBPL</g, ">Partner with SBIPL<");
  content = content.replace(/SBPL Admin/g, "SBIPL Admin");
  content = content.replace(/>SBPL</g, ">SBIPL<");
  content = content.replace(/"SBPL"/g, "\"SBIPL\"");
  content = content.replace(/SBPL is onboarding/g, "SBIPL is onboarding");
  content = content.replace(/support by SBPL/g, "support by SBIPL");
  content = content.replace(/SBPL Logo/g, "SBIPL Logo");
  content = content.replace(/SBPL Multi-Energy/g, "SBIPL Multi-Energy");
  content = content.replace(/SBPL \)/g, "SBIPL)");
  content = content.replace(/\(SBPL\)/g, "(SBIPL)");
  content = content.replace(/SBPL Premium/g, "SBIPL Premium");
  content = content.replace(/SBPL Investment/g, "SBIPL Investment");
  content = content.replace(/SBPL Facility/g, "SBIPL Facility");
  content = content.replace(/SBPL manages/g, "SBIPL manages");
  content = content.replace(/>SB<\/span><span className="text-green-500">PL<\/span>/g, '>SB</span><span className="text-green-500">IPL</span>');
  content = content.replace(/Shivay BioIndhan, SBPL/g, "Shivay BioIndhan, SBIPL");
  content = content.replace(/alternateName": "SBPL"/g, 'alternateName": "SBIPL"');
  
  if (content !== original) {
    fs.writeFileSync(f, content);
    console.log('Updated', f);
  }
});
