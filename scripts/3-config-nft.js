import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
    try {
        const editionDrop = await sdk.getContract("0x485CEE21DC10927E194E0716533Be54E89428eA2", "edition-drop");
        await editionDrop.createBatch([
            {
                name: "Eldian Armband",
                description: "This NFT will give you access to AOT-DAO!",
                image: readFileSync("scripts/assets/armband.jpg"),
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("failed to create the new NFT", error);
    }
})();