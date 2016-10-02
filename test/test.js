var $fixture = $('#qunit-fixture'),
    $template = $('#template');
    html = $template.html();

// Clear
$template.remove();

QUnit.test('chainable', function(assert) {
    $fixture.append(html);

    var $el = $('.beefup');

    assert.ok($el.beefup().addClass('testing'), 'can be chained');
    assert.equal($el.hasClass('testing'), true, 'class was added correctly from chaining');
});

QUnit.test('initialize', function(assert) {
    $fixture.append(html);

    var $el = $('.beefup');

    assert.ok($el.beefup().data('beefup'), 'is initialized');
});

QUnit.test('api methods', function(assert) {
    $fixture.append(html);

    var $el = $('.beefup');

    $el.beefup({
        openClass: 'is-open',
        openSpeed: 0,
        closeSpeed: 0
    });

    assert.equal($el.open().hasClass('is-open'), true, 'element is open');
    assert.equal($el.close().hasClass('is-open'), false, 'element is closed');
    assert.equal($el.click($el).hasClass('is-open'), true, 'click will open element');
    assert.equal($el.click($el).hasClass('is-open'), false, 'click will close element');
});

QUnit.test('callbacks', function(assert) {
    $fixture.append(html);

    var $el = $('.beefup');

    $el.beefup({
        openClass: 'is-open',
        openSpeed: 0,
        closeSpeed: 0,
        onInit: function($el) {
            $el.addClass('init');
        },
        onOpen: function($el) {
            $el.addClass('open');
        },
        onClose: function($el) {
            $el.addClass('close');
        }
    });

    assert.equal($el.hasClass('init'), true, 'element is initialized');
    assert.equal($el.open($el).hasClass('open'), true, 'element is open');
    assert.equal($el.close($el).hasClass('close'), true, 'element is closed');
});

QUnit.test('HTML5 data attributes', function(assert) {
    $fixture.append(html);

    var $el = $('.beefup');

    $el.beefup({
        openClass: 'is-open',
        openSpeed: 0
    });

    $el.attr('data-beefup-options', '{"openClass": "open"}');

    assert.equal($el.open($el).hasClass('open'), true, 'change open class');
});
