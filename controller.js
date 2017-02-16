document.getElementById("button1").onclick = function() { 

	var original               = field1.value
        var split_lines            = original.split("\n")

        var split_latin_text           = []
        var split_undoubled_text       = []
        var split_ipa_text             = []
        var split_krauss_text          = []
        var split_nagai_text           = []
        var split_cyrillic_text        = []
        var split_latin_stress_text    = []
        var split_ipa_stress_text      = []
        var split_cyrillic_stress_text = []

        for (var l = 0; l < split_lines.length; l++) {
            if (split_lines[l] == "") {
                split_latin_text.push("<p>")
                split_undoubled_text.push("<p>")
                split_ipa_text.push("<p>")
                split_krauss_text.push("<p>")
                split_nagai_text.push("<p>")
                split_cyrillic_text.push("<p>")
                split_latin_stress_text.push("<p>")
                split_ipa_stress_text.push("<p>")
                split_cyrillic_stress_text.push("<p>")
            }

            else {
                var split_text = []
                split_text = split_lines[l].split(" ")

                var split_latin           = []
                var split_undoubled       = []
                var split_ipa             = []
                var split_krauss          = []
                var split_nagai           = []
                var split_cyrillic        = []
                var split_latin_stress    = []
                var split_ipa_stress      = []
                var split_cyrillic_stress = []

                for (var w = 0; w < split_text.length; w++) {

                    var lowercased                 = split_text[w].toLowerCase()
                    var tokenized_with_apostrophes = tokenize(lowercased, true)
                    var tokenized                  = tokenize(lowercased, false)

                    var latin_vowels = new Set(['i', 'a', 'u', 'e'])
                    if (spellcheck(tokenized_with_apostrophes, latin_vowels, original)) {
                        var undoubled                  = undouble(tokenized)
                        var phonetic_ipa               = graphemes_to_phonemes_ipa(undoubled)
                        var adjusted_phonetic_ipa      = ipa_adjust_doubleVowel(phonetic_ipa)
                        var phonetic_krauss1975        = graphemes_to_phonemes_krauss1975(undoubled)
                        var phonetic_nagai2001         = graphemes_to_phonemes_nagai2001(undoubled)
                        var tokenized_cyrillic         = latin_to_cyrillic(undoubled)
                        var adjusted_cyrillic          = cyrillic_adjustments(tokenized_cyrillic)

                        var latin_syllabified          = syllabify(tokenized, latin_vowels)
                        var latin_stressed             = stress(latin_syllabified, latin_vowels)

                        var ipa_vowels = new Set(['\u0069', '\u0251', '\u0075', '\u0259'])
                        var ipa_syllabified            = syllabify(phonetic_ipa, ipa_vowels)
                        var ipa_stressed               = stress(ipa_syllabified, ipa_vowels)
                        var ipa_stress_adjusted        = ipa_adjust_doubleVowel(ipa_stressed)

                        var cyrillic_vowels = new Set(['\u0438', '\u0430', '\u0443', '\u044B', '\u04E3', '\u0101', '\u04EF'])
                        var cyrillic_syllabified       = syllabify(tokenized_cyrillic, cyrillic_vowels)
                        var cyrillic_stressed          = stress(cyrillic_syllabified, cyrillic_vowels)
                        var cyrillic_stress_adjusted   = cyrillic_adjustments(cyrillic_stressed)
                    }
                    else {
                        window.alert("Entry was misspelled. Please try again")
                    }

                    split_latin.push(tokens_to_string(tokenized_with_apostrophes))
                    split_undoubled.push(tokens_to_string(undoubled))
                    split_ipa.push(tokens_to_string(phonetic_ipa))
                    split_krauss.push(tokens_to_string(phonetic_krauss1975))
                    split_nagai.push(tokens_to_string(phonetic_nagai2001))
                    split_cyrillic.push(tokens_to_string(adjusted_cyrillic))
                    split_latin_stress.push(tokens_to_string(latin_stressed).replace(/(\d+)/g, "<sub>$1</sub>"))
                    split_ipa_stress.push(tokens_to_string(ipa_stress_adjusted).replace(/(\d+)/g, "<sub>$1</sub>"))
                    split_cyrillic_stress.push(tokens_to_string(cyrillic_stress_adjusted).replace(/(\d+)/g, "<sub>$1</sub>"))

                } // End word-'for' Loop

                split_latin_text.push(split_latin.join(" "))
                split_undoubled_text.push(split_undoubled.join(" "))
                split_ipa_text.push(split_ipa.join(" "))
                split_krauss_text.push(split_krauss.join(" "))
                split_nagai_text.push(split_nagai.join(" "))
                split_cyrillic_text.push(split_cyrillic.join(" "))
                split_latin_stress_text.push(split_latin_stress.join(" "))
                split_ipa_stress_text.push(split_ipa_stress.join(" "))
                split_cyrillic_stress_text.push(split_cyrillic_stress.join(" "))
            } // End 'else' block

        } // End line-'for' Loop

        us_ess.innerHTML               = split_latin_text.join("<br>")
        us_ess_undoubled.innerHTML     = split_undoubled_text.join("<br>")
        ipa.innerHTML                  = split_ipa_text.join("<br>")
        krauss1975.innerHTML           = split_krauss_text.join("<br>")
        nagai2001.innerHTML            = split_nagai_text.join("<br>") 
        ru_ess.innerHTML               = split_cyrillic_text.join("<br>") 
        latin_stress.innerHTML         = split_latin_stress_text.join("<br>") 
        ipa_stress.innerHTML           = split_ipa_stress_text.join("<br>") 
        cyrillic_stress.innerHTML      = split_cyrillic_stress_text.join("<br>") 

};

/**
document.getElementById("field1").addEventListener("keydown", function(event) {
    //event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("button1").click();
    }
});
*/
