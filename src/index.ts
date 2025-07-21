/// Using a JIS based keyboard, so that the mapping symbols are different from US layout.
/// Take a look at comments for the mapping corresponding.

import {
  map,
  rule,
  writeToProfile,
} from 'karabiner.ts'

const symbolManipulators = [
  // Numeric row
  map('grave_accent_and_tilde').to('7', 'shift'), // ZenHan => '
  map('2', 'shift').to('open_bracket'), // Shift + 2 => @
  map('7', 'shift').to('international3', 'shift'), // Shift + 7 => |
  map('0', 'shift').to('open_bracket', 'shift'), // Shift + 0 => `
  map('hyphen').to('equal_sign'), // - => ^
  // Top row
  map('open_bracket').to('close_bracket'), // @ => [
  map('close_bracket').to('non_us_pound'), // [ => ]
  // Middle row
  map('semicolon').to('hyphen'), // ; => -
  map('non_us_pound').to('semicolon'), // ] => ;
  // Bottom row
  map('international1', 'shift').to('international3', 'option'), // Shift + _ => \
]

// ! Change '--dry-run' to your Karabiner-Elements Profile name.
// (--dry-run print the config json into console)
// + Create a new profile if needed.
writeToProfile('Basic Profile for Lenovo Trackpoint Keyboard 2 by Kamome283', [
  rule('Key mapping').manipulators([
    ...symbolManipulators,
  ]),
])
