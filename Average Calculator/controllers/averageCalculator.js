const fetchNumbers = require("../utils/fetchNumbers");
const WINDOW_SIZE = 10;
const numberWindow = new Set();
const averageCalculator = async (req, res) => {
    try {
        const numberType = req.params.numberType;
        const prevState = Array.from(numberWindow);

        const newNumbers = await fetchNumbers(numberType);

        newNumbers.forEach(num => {
            if (!numberWindow.has(num)) {
                numberWindow.add(num);
                if (numberWindow.size > WINDOW_SIZE) {
                    numberWindow.delete([...numberWindow][0]);
                }
            }
        });

        const currState = Array.from(numberWindow);
        const avg = currState.length > 0 ? (currState.reduce((a, b) => a + b, 0) / currState.length).toFixed(2) : "0.00";

        res.json({
            windowPrevState: prevState,
            windowCurrState: currState,
            numbers: newNumbers,
            avg: parseFloat(avg)
        });
    } catch (error) {
        console.error(`Error processing request: ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { averageCalculator };
