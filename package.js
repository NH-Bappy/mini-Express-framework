const json = (req, res, next) => {
    let body = "";

    req.on("data", chunk => {
        body += chunk;
    });

    req.on("end", () => {
        if (body) {
            try {
                req.body = JSON.parse(body);
            } catch (error) {
                res.statusCode = 400;
                return res.end("Invalid JSON input");
            }
        } else {
            req.body = {}; // safely set empty body
        }

        next();
    });
};

module.exports = { json };
