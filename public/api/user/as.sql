DELIMITER $$

CREATE TRIGGER update_brand_generation AFTER UPDATE ON brands
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM brands_generation WHERE id_brand = NEW.id_brand) THEN
        UPDATE brands_generation
        SET 
            `Tech` = NEW.`Tech`, 
            `Casino brand` = NEW.`Casino brand`, 
            `Current Status` = NEW.`Current Status`, 
            `Sandbox` = NEW.`Sandbox`, 
            `Interaction Type` = NEW.`Interaction Type`, 
            `GEO` = NEW.`GEO`, 
            `Localization` = NEW.`Localization`, 
            `Shortcomings` = NEW.`Shortcomings`, 
            `Date of Last Change` = NEW.`Date of Last Change`, 
            `The type of a deal` = NEW.`The type of a deal`, 
            `CPA` = NEW.`CPA`, 
            `RS` = NEW.`RS`, 
            `BL` = NEW.`BL`, 
            `BN` = NEW.`BN`, 
            `Bonus type` = NEW.`Bonus type`, 
            `Segment` = NEW.`Segment`, 
            `Deposit bonus, %` = NEW.`Deposit bonus, %`, 
            `Max bonus` = NEW.`Max bonus`, 
            `Free spins` = NEW.`Free spins`, 
            `Wager` = NEW.`Wager`, 
            `Min deposit` = NEW.`Min deposit`, 
            `В-та` = NEW.`В-та`, 
            `Offer content` = NEW.`Offer content`, 
            `Our offer content` = NEW.`Our offer content`, 
            `Affiliate Link` = NEW.`Affiliate Link`, 
            `reg2dep` = NEW.`reg2dep`, 
            `gobig` = NEW.`gobig`, 
            `вес` = NEW.`вес`, 
            `count` = NEW.`count`, 
            `Link img` = NEW.`Link img`, 
            `Casino brand 1` = NEW.`Casino brand 1`, 
            `keitaro gobig ID` = NEW.`keitaro gobig ID`, 
            `keitaro r2d ID` = NEW.`keitaro r2d ID`, 
            `postback` = NEW.`postback`, 
            `Segment2` = NEW.`Segment2`, 
            `Первый приоритет` = NEW.`Первый приоритет`, 
            `Trendsetting` = NEW.`Trendsetting`, 
            `Hottest` = NEW.`Hottest`, 
            `Quick Sign-Up` = NEW.`Quick Sign-Up`,
            `Video` = NEW.`Video`
        WHERE id_brand = NEW.id_brand;
    ELSE
        INSERT INTO brands_generation (
            `Tech`, `Casino brand`, `Current Status`, `Sandbox`, `Interaction Type`, `GEO`, `Localization`, `Shortcomings`, `Date of Last Change`, `The type of a deal`, `CPA`, `RS`, `BL`, `BN`, `Bonus type`, `Segment`, `Deposit bonus, %`, `Max bonus`, `Free spins`, `Wager`, `Min deposit`, `В-та`, `Offer content`, `Our offer content`, `Affiliate Link`, `reg2dep`, `gobig`, `вес`, `count`, `Link img`, `Casino brand 1`, `keitaro gobig ID`, `keitaro r2d ID`, `postback`, `Segment2`, `Первый приоритет`, `Trendsetting`, `Hottest`, `Quick Sign-Up`, `id_brand`, `Video`, `icons`, `review`
        ) VALUES (
            NEW.`Tech`, NEW.`Casino brand`, NEW.`Current Status`, NEW.`Sandbox`, NEW.`Interaction Type`, NEW.`GEO`, NEW.`Localization`, NEW.`Shortcomings`, NEW.`Date of Last Change`, NEW.`The type of a deal`, NEW.`CPA`, NEW.`RS`, NEW.`BL`, NEW.`BN`, NEW.`Bonus type`, NEW.`Segment`, NEW.`Deposit bonus, %`, NEW.`Max bonus`, NEW.`Free spins`, NEW.`Wager`, NEW.`Min deposit`, NEW.`В-та`, NEW.`Offer content`, NEW.`Our offer content`, NEW.`Affiliate Link`, NEW.`reg2dep`, NEW.`gobig`, NEW.`вес`, NEW.`count`, NEW.`Link img`, NEW.`Casino brand 1`, NEW.`keitaro gobig ID`, NEW.`keitaro r2d ID`, NEW.`postback`, NEW.`Segment2`, NEW.`Первый приоритет`, NEW.`Trendsetting`, NEW.`Hottest`, NEW.`Quick Sign-Up`, NEW.`id_brand`, NEW.`Video`, 'default_icon_value', 'default_review_value'
        );
    END IF;
END$$

DELIMITER ;
