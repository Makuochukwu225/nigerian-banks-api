const fs = require('fs');
const exec = require('child_process').exec;
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

async function processLocalBanks() {
    if (!fs.existsSync(DATA_FILE)) {
        console.error("data.json not found!");
        return;
    }

    try {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
        const banks = JSON.parse(fileContent);
        let updated = false;

        console.log(`Processing ${banks.length} banks from data.json...`);

        for (const bank of banks) {
            const logo = bank.logo;
            if (logo && (logo.startsWith('http://') || logo.startsWith('https://'))) {
                const slug = bank.slug || bank.name.toLowerCase().replace(/\s+/g, '-');
                const destPath = `logos/${slug}.png`;
                console.log(`Downloading logo for ${bank.name} from ${logo}...`);
                
                try {
                    await new Promise((resolve, reject) => {
                        exec(`wget "${logo}" -O ./${destPath}`, (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                    bank.logo = destPath;
                    updated = true;
                    console.log(`Saved logo to ${destPath}`);
                } catch (e) {
                    console.error(`Failed to download logo for ${bank.name}:`, e.message);
                }
            }
        }

        if (updated) {
            fs.writeFileSync(DATA_FILE, JSON.stringify(banks, null, 4), 'utf8');
            console.log("data.json successfully updated with local logo paths.");
        } else {
            console.log("No remote logos to download.");
        }
    } catch (e) {
        console.error("Error processing local banks:", e);
    }
}

processLocalBanks();