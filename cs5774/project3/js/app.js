/*
EvaLLM Project 3: jQuery for selection 
*/

$(function () {
    'use strict';

    // Simulated search: a GET form that redirects here
    if ($('#search-results').length) {
        const query = new URLSearchParams(window.location.search).get('q') || '';
        const normalizedQuery = query.trim().toLowerCase().replace(/\s+/g, ' ');
        const $results = $('#search-results');

        if (normalizedQuery === 'response quality') {
            $('#search-summary').text('2 simulated results for "' + query + '".');
            const examples = [
                { title: 'Prime Number Function', note: 'GPT-5 · 4 / 5 · Missed edge case' },
                { title: 'Summarize Research Abstract', note: 'Claude Sonnet 5 · 3 / 5 · Needs review' }
            ];
            examples.forEach(function (example, index) {
                const $card = $('<article>').addClass('panel');
                $('<h2>').text(example.title).appendTo($card);
                $('<p>').text(example.note).appendTo($card);
                $('<a>').attr('href', index === 0 ? 'detail.html' : 'list.html').text(index === 0 ?
                    'Open Evaluation' : 'Browse Test Cases').appendTo($card);
                $results.append($card);
            });
        } else {
            $('#search-summary').text(
                query
                    ? 'No results for "' + query + '".'
                    : 'Enter a phrase to search.');

            $('<p>')
                .addClass('panel')
                .text('No matching evaluations were found. Return to Test Cases and search for "response quality".')
                .appendTo($results);
        }
        $('#header-query').val(query);
    }

    // Interaction 1: Delegated click
    // Modify a button and counter, and generate a note inside the chosen row

    $('.results-table tbody').on('click', '.save-case', function () {
        const $button = $(this);
        const $row = $button.closest('tr');
        const isSaved = $button.attr('aria-pressed') === 'true';
        $button.attr('aria-pressed', String(!isSaved)).text(isSaved ?
            'Save for review' : 'Unsave');
        $row.toggleClass('saved-row', !isSaved);
        $row.find('.saved-note').remove();
        if (!isSaved) {
            $('<span>').addClass('saved-note meta').text('Added to your review queue.').appendTo($row.find('.case-title'));
        }
        const count = $('.save-case[aria-pressed="true"]').length;
        $('#saved-count').text(count + ' test case' + (count === 1 ? '' : 's') +
            ' saved for review.');
    });

    // Interaction 2 - change and DOM traversal;
    // Update existing badges, then create a new confirmation
    $('#status-change').on('change', function () {
        const status = $(this).val();
        const $controls = $(this).closest('.status-control');
        const statusClasses = {
            'Reviewed': 'status-reviewed',
            'Needs Review': 'status-needs-review',
            'Draft': 'status-draft'
        };

        $controls.find('.current-status').add('#evaluation-status').removeClass(
            'status-reviewed status-needs-review status-draft').addClass(
                statusClasses[status]).text(status);
        $controls.find('.status-feedback').remove();
        $('<p>').addClass('status-feedback').attr('role', 'status').text('Evaluation status changed to ' +
            status + '.').appendTo($controls);
    });
});