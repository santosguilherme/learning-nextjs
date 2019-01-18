import React from 'react';

import marked from 'marked';
//import Highlight from 'react-highlight';
import dynamic from 'next/dynamic';

import MyLayout from '../components/MyLayout';

const Highlight = dynamic(import('react-highlight'));

marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true
});

export default function WithPost (options) {
    return class PostPage extends React.Component {
        renderMarkdown () {
            // If a code snippet contains in the markdown content
            // then use Highlight component
            if (/~~~/.test(options.content)) {
                return (
                    <div>
                        <Highlight innerHTML>
                            {marked(options.content)}
                        </Highlight>
                    </div>
                )
            }

            // If not, simply render the generated HTML from markdown
            return (
                <div
                    dangerouslySetInnerHTML={{__html: marked(options.content)}}
                />
            )
        }

        render () {
            return (
                <MyLayout>
                    <h1>{options.title}</h1>
                    { this.renderMarkdown() }
                </MyLayout>
            )
        }
    }
}