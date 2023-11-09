import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { max } from 'rxjs';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string, words: number): string {
    const replacedNewlines = value?.replace(/\n/g, '<br>');
    const truncatedText = this.truncate(replacedNewlines, words);

    return truncatedText;
  }

  private truncate(text: string, chars: number): string {
    /*
    const wordsArray = text?.split(' ');
    const truncatedWords = wordsArray?.slice(0, words);
    const remainingWords = wordsArray?.slice(words);

    let truncatedText = truncatedWords?.join(' ');

    if (remainingWords?.length > 0) {
      truncatedText += ' <br> ' + this.truncate(remainingWords?.join(' '), words);
    }
    */

    var truncatedText: string = ''
    if (text) {
      truncatedText = text.substring(0, chars);
      if (text.length > chars) {
        const suffix = Math.min(text.length - truncatedText.length, 10)
        truncatedText += ' ... ' + text.substring(text.length - suffix, text.length)
      }

    }
    return truncatedText;
  }
}