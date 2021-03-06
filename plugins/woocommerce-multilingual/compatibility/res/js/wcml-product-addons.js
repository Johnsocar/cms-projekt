jQuery(document).ready(function ($) {

    $('.wc-pao-addon-header').each(function () {
        fix_dialogs_visibility($(this));
    });

    if( $('.wcml_custom_prices').length > 0 ){
        $('.wcml_custom_prices').insertAfter( $('.global-addons-form tr:eq(2)') ).show();
    }

    $(document).on('click', '#product_addons_data .js-wcml-dialog-trigger', function () {
        var dialog = $(this).parent().find('.wcml-dialog');
        var default_price = $(this).parent().parent().find('input.wc_input_price').val();
        var option_type = $(this).closest('.wc-pao-addon-content').find('.wc-pao-addon-type-select').val();

        dialog.find('.default-price strong').html(default_price ? default_price : 0);

        if ('multiple_choice' === option_type || 'checkbox' === option_type) {
            var option_text = $(this).parent().parent().find('.wc-pao-addon-content-label input[type="text"]').val();
            if (option_text) {
                dialog.find('p>strong').html(option_text);
            }
        } else {
            var addon_text = $(this).closest('.wc-pao-addon-content').find('.wc-pao-addon-title input[type="text"]').val();
            if (addon_text) {
                dialog.find('p>strong').html(addon_text);
            }
        }
    });

    $(document).on('change', '.wc-pao-addon-type-select', function () {
        fix_dialogs_visibility($(this));
        maybe_set_prices_dialog_visible($(this));
    });

    $(document).on('click', '.wcml_product_addons_apply_prices', function () {

        var dialog = $(this).closest('.wcml-ui-dialog');
        var dialog_id = $(this).data('dialog');

        dialog.find('.wc_input_price').each(function () {
            $('.wcml-dialog#' + dialog_id).find('input[name="' + $(this).attr('name') + '"]').attr('value', $(this).val());
        });
        dialog.find('.wcml-dialog-close-button').trigger('click');
    });

    $(document).on('change', '.wcml_custom_prices_input', function () {
        if (parseInt($(this).val()) === 1) {
            $('#product_addons_data .js-wcml-option-prices').each(function () {
                $(this).removeClass('hidden');
            });
        } else {
            $('#product_addons_data .js-wcml-option-prices').each(function () {
                $(this).addClass('hidden');
            });
        }
    });

});

function fix_dialogs_visibility(element) {

    var parent = element.closest('.wc-pao-addon');
    var option_type = parent.find('.wc-pao-addon-type-select').val();

    parent.find('.wc-pao-addon-adjust-price-settings').append(parent.find('.wc-pao-addon-content>.wcml-option-prices'));

    if ('multiple_choice' !== option_type && 'checkbox' !== option_type) {
        parent.find('.wc-pao-addon-content-option-rows .wcml-option-prices .wc_input_price').each(function () {
            jQuery(this).prop('disabled', true);
        });
        parent.find('.wc-pao-addon-adjust-price-settings .wcml-option-prices .wc_input_price').each(function () {
            jQuery(this).prop('disabled', false);
        });
    } else {
        parent.find('.wc-pao-addon-adjust-price-settings .wcml-option-prices .wc_input_price').each(function () {
            jQuery(this).prop('disabled', true);
        });

        parent.find('.wc-pao-addon-content-option-rows .wcml-option-prices .wc_input_price').each(function () {
            jQuery(this).prop('disabled', false);
        });
    }

}

function maybe_set_prices_dialog_visible(element) {
    if (element.closest('#wpbody').find('.wcml_custom_prices_input:checked').val() == 1) {
        element.closest('.wc-pao-addon').find('.js-wcml-option-prices').each(function () {
            jQuery(this).removeClass('hidden');
        });
    }
}