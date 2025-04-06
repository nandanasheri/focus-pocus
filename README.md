# lock0ut, explore your traffic
## Inspiration
Take a moment to actually think about what your hobbies are. After a long day at school do you come back home and read a book, do you crochet or do you rot in bed consuming hours of content scrolling through TikTok. We've reached an age in technology where consumption of media has gone from something that it informative, social and fun to a certain level of numbness where so many people would just rather be locked in a room **doom scrolling** Instagram instead of actually catching up with friends to go play Trivia.

We designed lock0ut to be a way to connect with **friends from a wellness point of view** but also to decrease the consumption of social media sites (even LinkedIn!). lock0ut is an application where you host a study session, a hangout, even a fun game of Mafia with a group of friends absent from your **distracting applications**.

## What it does
With lock0ut, you and your friends are on the **same network** when hosting a hangout. Once everyone is on the network, lock0ut essentially **tracks which devices** are accessing **what domains** through network **packet sniffing**. This provides a plethora of real time data analytics and updates to look at such as

- what sites are frequently visited, to call your friends out on
- how much data is being sent back and forth from your device and who is not respecting the rules of the hangout by going on Instagram!
- exactly how much traffic devices across the network have in a completely private manner so you play a fun guessing game to figure out who's constantly on their phone.
- finally, we wanted to nail down on the idea of productivity by flagging several IP Addresses stemming from social media sites and lock0ut provides the percentage of your network traffic that is being produced from these applications.

Privacy is a _big concern_ to us and that's why all the data is _completely anonymized_. There is no way to identify a user temporarily except for their _IPV4 Address_.

Once you're on a network, it doesn't matter what device you are connecting from. lock0ut is **equally accessible** from a **Linux PC** as it is from an Apple Vision Pro!

## How we built it
We went through several iterations of software and frameworks for building out various features. For our frontend, we used TypeScript, Nextjs, TailwindCSS and shad-cn for visually pleasing components. Our backend has several different layers, starting with testing using WireShark for packet sniffing and generate .pcap files, scapy which is a versatile Python library use to program **man-in-the-middle packet sniffing**. We ran 2 Flask servers as our backend with an sqlite database. We also had to set up a reverse DNS server to reverse engineer IPV4 and IPV6 addresses to domain names with Python socket library.

## Challenges we ran into
We didn't expect Packet Sniffing to be easy but we didn't expect it to be this _difficult_. We had several different software applications that we went through before finalizing on this model for **gathering network traffic**. We also had auth set up with Firebase which we ended up abandoning because we had session tied to a single host not a group of authenticated users. We started with WireGuard, OpenVPN, we considered peer-to-peer connections, chrome extensions even! Networking is not an area we had worked with before in the context of a hackathon so it was a lot of trial and error!

## Accomplishments that we're proud of
Getting packet sniffing to reliably produce results was a huge feat that we weren't sure was possible at 10pm on Saturday night. We pivoted our scope to be _more flexible_ to what the network so graciously allowed and we would not have a project otherwise.

## What we learned
How _little_ control we truly have on Northwestern's wifi. More importantly, we learnt a lot about being flexible when it comes to scope of project. We learnt a lot about features that we ended up abandoning like authentication using Firebase. Every line of code we experimented with regardless whether it made to our final product was a learning experience.

## What's next for Lock0ut
Our project stemmed from the idea of blocking users at a DNS level using WireGuard. we'd like to hopefully take lock0ut to pushing real time alerts as well as actively blocking sites or redirecting them during certain study and hangout sessions true to our idea of being with each other when we spend time today.

## Credits
[Netxjs and Firebase Template](https://github.com/enesien/venefish)
[shad-cn](https://ui.shadcn.com/)
[Flask](https://flask.palletsprojects.com/en/stable/)
[Recharts](https://recharts.org/en-US/)
ChatGPT, Gemini
