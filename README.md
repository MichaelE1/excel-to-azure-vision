# Excel to Azure vision

A Node.js script for uploading image URLs from excel to Azure vision API.

## Usage

1. Clone the repository
2. Install required dependencies

    ```
    npm install
    ```
3. Move your excel spreadsheet to the cloned directory and rename it to `images.xlsx`
4. On line 23 of `app.js`, change `data[i].vcImagePath` to the column heading in your spreadsheet that contains the image URLs.
5. Create a `variables.env` file to store your Azure API key. Alternatively, replace `process.env.SUBKEY` on line 31 of `app.js` with it.
6. Run the script with
    ```
    node app.js 5
    ```
    
    Where 5 indicates the index of the image to be sent to the API. If no argument is provided, the default is 0.

6. Look for the JSON output in the newly created `output` directory!

## License

MIT.