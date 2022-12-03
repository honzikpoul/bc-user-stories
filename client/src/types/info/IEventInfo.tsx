
export default interface IEventInfo {
    id: string
    headline: string;
    description: string;
    status: string;
    severity: string;
    created: string;
    updated: string;
    //... todo later 
}

/*
<event>
    <id>drivebc.ca/DBC-16911</id>
    <headline>INCIDENT</headline>
    <description>Soda-Creek Macalister Road, in both directions. Landslide at 10 kms from the Junction of Highway 97. Road closed. Geotech assessment underway. Next update time Wed Dec 7 at 10:00 AM PST. Last updated Wed Nov 30 at 7:30 PM PST. (DBC-16911)</description>
    <ivr_message xmlns="https://drivebc.ca/api/open511-extensions">Soda-Creek Macalister Road, in both directions. Landslide at 10 kms from the Junction of Highway 97. Road closed. Geotech assessment underway. Next update time Wednesday, December 7 at 10:00 AM. Last updated Wednesday, November 30 at 7:30 PM.</ivr_message>
    <linear_reference_km>-1</linear_reference_km>
    <severity>MAJOR</severity>
    <status>ACTIVE</status>
    <created>2020-03-29T14:57:04-07:00</created>
    <updated>2022-11-30T19:30:29-08:00</updated>
    <link rel="jurisdiction" href="https://api.open511.gov.bc.ca/jurisdiction"/>
    <link rel="self" href="https://api.open511.gov.bc.ca/events/drivebc.ca/DBC-16911"/>
    <event_type>INCIDENT</event_type>
    <event_subtypes>
        <event_subtype>HAZARD</event_subtype>
    </event_subtypes>
    <schedule>
        <intervals>
            <interval>2020-03-29T21:57/</interval>
        </intervals>
    </schedule>
    <roads>
        <road>
            <name>Other Roads</name>
            <from>at 10 kms from the Junction of Highway 97</from>
            <direction>BOTH</direction>
        </road>
    </roads>
    <areas>
        <area>
            <link rel="self" href="http://www.geonames.org/8630134"/>
            <id>drivebc.ca/7</id>
            <name>Cariboo District</name>
        </area>
    </areas>
    <geography>
        <gml:Point srsName="urn:ogc:def:crs:EPSG::4326">
            <gml:pos>52.350986 -122.296638</gml:pos>
        </gml:Point>
    </geography>
</event>
 * 
 */