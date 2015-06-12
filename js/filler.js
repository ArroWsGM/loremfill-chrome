var SKIP_CONTROL = '__SKIP_CONTROL__';
chrome.runtime.onMessage.addListener(function(msg, sender, callback) {
    if (msg.text && msg.text === 'fill_all_forms') {
        S.extendPrototype();
        var inputs = jQuery(document).find("input[type='text'], input[type='password'], input[type='email'], input[type='number'], input[type='tel'], textarea, select");
        inputs.each(function(j, input) {
            input = jQuery(input);
            if (input.is(":visible") && !input.is("[readonly]")) {
                var value = decide(input);
                if (value !== SKIP_CONTROL) {
                    input.val(value);
                }
            }
        });
    }
});

function decide(input) {
    var value;
    var strategies = [TypeAttributeStrategy, NameAttributeStrategy, ClassAttributeStrategy, LabelAttributeStrategy, PlaceholderAttributeStrategy];
    for(var i=0; i<strategies.length; i++) {
        var strategy = strategies[i];
        value = strategy.execute(input);
        if (value) {
            return value;
        }
    }
    return chance.sentence();
}

