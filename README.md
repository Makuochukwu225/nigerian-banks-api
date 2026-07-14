# Nigerian Banks API

A simple, lightweight API containing details and assets (logos, USSD codes, and bank codes) for all banks operating in Nigeria.

This project allows you to manage the list of banks manually in `data.json`, with a helper script to automatically process and cache remote bank logos locally.

---

## 🚀 API Endpoints

### 1. Bank List JSON
Get the list of all banks and their assets:

* **Direct GitHub Pages:**
  ```
  https://makuochukwu225.github.io/nigerian-banks-api/data.json
  ```
* **jsDelivr CDN:**
  ```
  https://cdn.jsdelivr.net/gh/makuochukwu225/nigerian-banks-api@main/data.json
  ```

### 2. Bank Logos
Fetch bank logos directly by their `slug`:

* **Direct GitHub Pages:**
  ```
  https://makuochukwu225.github.io/nigerian-banks-api/logos/{slug}.png
  ```
* **jsDelivr CDN:**
  ```
  https://cdn.jsdelivr.net/gh/makuochukwu225/nigerian-banks-api@main/logos/{slug}.png
  ```

---

## 🛠 How It Works & Local Setup

The repository contains a helper script (`index.js`) that automatically processes your manual edits in `data.json` and downloads any remote logos to keep them hosted locally.

### 1. Run the local processor
To download dependencies and start the watcher/processor:
```bash
# Install dependencies (nodemon)
npm install

# Start the local processor
npm run dev
```

### 2. Manually adding a Bank
To add a bank, open `data.json` and append a new object to the array:
```json
{
    "id": 101,
    "name": "Example Bank",
    "slug": "example-bank",
    "code": "12345",
    "logo": "https://example.com/remote-logo-url.png",
    "ussd": "*123#"
}
```

When you save the file:
1. The script will detect the change.
2. It will automatically download the remote logo from `https://example.com/remote-logo-url.png` and save it to `./logos/example-bank.png`.
3. It will update the `"logo"` field in `data.json` to `"logos/example-bank.png"`.

---

## 🤝 Contributing
Feel free to open an issue or submit a pull request if you want to add more banks, USSD codes, or update existing assets.
