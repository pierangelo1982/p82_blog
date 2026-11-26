import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getPosts, summary } from '../lib/posts';

export async function GET(context) {
	const posts = await getPosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		customData: '<language>it-it</language>',
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: summary(post),
			link: `/blog/${post.id}/`,
		})),
	});
}
