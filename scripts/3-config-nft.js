import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
    try {
        const editionDrop = await sdk.getContract("INSERT_EDITION_DROP_ADDRESS", "edition-drop");
        await editionDrop.createBatch([
            {
                name: "Eldian armband",
                description: "This NFT will give you access to NarutoDAO!",
                image: readFileSync("scripts/assets/armband.jpg"),
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("failed to create the new NFT", error);
    }
})();