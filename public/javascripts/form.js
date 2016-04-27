var _autoComplCounter = 0;

function assignAutoCompl(_id)
{
    document.getElementById(_id).hidden = false;
    var _autocomplete = new google.maps.places.Autocomplete(document.getElementById(_id));
    _autocomplete.setTypes(['geocode']);
    google.maps.event.addListener(_autocomplete, 'place_changed', function()
    {
        //processing code
    });
}

function CreateElem()
{
    assignAutoCompl("AutoCompl0");
    assignAutoCompl("AutoCompl1");
}
