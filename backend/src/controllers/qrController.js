import QRCode from "qrcode";

/**
 * @desc    Generate QR Code
 * @route   GET /api/qr
 * @access  Public
 */
export const generateQR = async (req, res, next) => {
    try {
        const { text, color, background } = req.query;

        if (!text) {
            return res.status(400).json({ error: "Text parameter is required" });
        }

        const options = {
            color: {
                dark: color || "#000000",
                light: background || "#ffffff"
            },
            width: 400,
            margin: 2
        };

        const qrDataUrl = await QRCode.toDataURL(text, options);
        
        res.json({ 
            qrCode: qrDataUrl,
            text,
            options 
        });
    } catch (error) {
        next(error);
    }
};
