import React from 'react';
import UserList from "./UserList";
import PostSubmit from "./PostSubmit";
import {useSelector} from "react-redux";
import PostList from "./PostList";

const HomePage = () => {

    const {isLogged} = useSelector(store => ({isLogged: store.isLogged}))

    return (
        <div>
            <h1>Home Page</h1>
            <div className="container"></div>
            <div className="row">
                {
                    isLogged &&
                    <div className="col-12 col-sm-6">
                        <PostSubmit/>
                        <PostList/>
                    </div>
                }
                <div className={isLogged ? "col-sm-6 col-12 mt-4" : "col-12"}>
                    <UserList/>
                </div>
            </div>
            {/*    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat a nunc ut pellentesque. Integer a placerat turpis. Morbi cursus lectus in ligula auctor sagittis quis ac ex. Quisque cursus eleifend diam vitae vehicula. Ut quis leo mi. Suspendisse facilisis pretium justo et ornare. Duis non magna dignissim diam aliquam aliquet non in lacus. Morbi at nulla arcu.*/}

            {/*    Donec accumsan consequat urna, vitae tristique felis. Ut ac molestie mauris, a pellentesque orci. Praesent pharetra quam nec tellus commodo, et convallis felis condimentum. In tempus eros at mi suscipit tristique. Duis ornare ligula et mauris varius rutrum. Cras bibendum at sapien ut commodo. Integer sed massa facilisis, sagittis ex a, tincidunt est. Duis finibus sapien orci, quis finibus sem pulvinar ut. Praesent ultricies aliquet elit, ut placerat nulla luctus vitae. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas aliquet est viverra nisi suscipit tempor. In rhoncus euismod tempus. Duis rhoncus feugiat nibh, ut facilisis nisl tincidunt a. Donec vulputate ante at rutrum gravida. Fusce non molestie dui. Vivamus interdum orci in urna hendrerit mollis.*/}

            {/*    Mauris fermentum mi eros, vel laoreet ex scelerisque posuere. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sapien sit amet lacus convallis aliquam. Vivamus feugiat quam ut sapien bibendum pharetra. Curabitur non lacinia nisl. Sed commodo ligula sit amet magna elementum convallis. Donec magna felis, mattis non metus interdum, elementum sagittis libero.*/}

            {/*    Vestibulum sollicitudin suscipit lorem at convallis. Fusce id dolor tempor, tempor quam eu, tempus libero. Etiam eget facilisis sem, ut malesuada ipsum. Ut congue, velit quis commodo posuere, augue leo auctor nulla, ac malesuada elit justo tincidunt ipsum. Pellentesque sit amet dui et augue blandit maximus. Nulla facilisi. Nullam non arcu suscipit, interdum tortor non, dignissim sapien. Nam tristique feugiat orci. Duis id nunc feugiat, porta lectus eget, varius nibh. Praesent venenatis ipsum nec lacinia aliquet. Phasellus quis massa et ipsum gravida iaculis. Mauris rutrum urna quis enim ultricies, vel malesuada nulla tristique. Phasellus sapien odio, ullamcorper sed libero vitae, maximus ultrices est. Proin ultrices ligula ac diam convallis egestas. Cras ultricies sed felis vel congue.*/}

            {/*    Sed quis tellus vel magna pretium pellentesque. Vivamus est orci, eleifend nec euismod non, ullamcorper vel eros. Vestibulum blandit egestas dui aliquam maximus. Sed ullamcorper dapibus interdum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur gravida justo libero, eu gravida leo congue vitae. Aenean tristique orci vitae orci aliquam, ut posuere risus tincidunt.*/}

            {/*    In pharetra libero vitae tortor accumsan, ut volutpat lectus pharetra. Vestibulum ac porta eros. Cras pellentesque metus at ipsum ornare pretium. Duis rhoncus dolor dolor, et rutrum leo gravida faucibus. Mauris lorem diam, aliquam eu leo a, placerat sagittis justo. Nullam accumsan finibus porta. Integer luctus, ligula rutrum tincidunt laoreet, mauris massa convallis tortor, in viverra lectus neque sit amet nunc. Morbi ultricies in quam vel tincidunt. Proin suscipit efficitur nulla vitae lacinia. Vestibulum varius nec enim et dictum. Cras fringilla odio nulla. Aliquam at lobortis eros.*/}

            {/*    Nulla vitae est sit amet odio pellentesque dictum. Pellentesque bibendum lorem placerat rutrum porta. In iaculis ante non lectus interdum, sed efficitur mi auctor. Nulla quis sapien dui. Nunc tincidunt porta faucibus. Donec pulvinar, ante ac eleifend aliquet, lacus augue pulvinar est, at dictum nibh arcu sit amet mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce iaculis purus libero, et consectetur quam varius sit amet. Etiam at enim tincidunt eros tincidunt sollicitudin eget rhoncus libero. Sed metus tortor, facilisis eget dignissim nec, lobortis vel felis. Fusce a velit nec lacus ullamcorper tristique. Integer ut commodo augue. Morbi aliquam pretium purus, et lobortis nisi facilisis id.*/}

            {/*    Vestibulum ac est at felis aliquet dapibus nec id erat. Quisque sed velit sit amet sapien elementum mollis eget in massa. Sed at elit sit amet augue faucibus sodales. Quisque molestie, lacus accumsan aliquet venenatis, risus ipsum gravida libero, congue semper odio leo ac risus. Morbi tempus neque sem, vitae luctus libero tincidunt non. Etiam ut purus in elit mollis lacinia nec quis ipsum. Praesent hendrerit aliquam leo, sit amet dapibus diam vestibulum at. Vestibulum et est id odio egestas cursus. Praesent nulla lectus, imperdiet vitae ipsum ac, tincidunt pulvinar augue.*/}

            {/*    Fusce pulvinar hendrerit ornare. Duis quis dapibus est. Cras vel ante id velit scelerisque rhoncus a eu lacus. Proin at elementum nibh. Nulla ornare iaculis neque, sed imperdiet justo volutpat ac. In lacinia odio eu commodo bibendum. Integer euismod, elit at ultricies gravida, elit justo consequat mi, sit amet rutrum nunc ex vitae sem. Nullam eget nisl et leo iaculis sagittis sed non lacus. Etiam sed malesuada sapien, eu sollicitudin nibh. Vivamus et massa turpis. Etiam eu blandit nisi. Quisque neque nulla, egestas eget orci a, tincidunt ornare ipsum. In id consectetur magna. Nam consectetur condimentum bibendum.*/}

            {/*    Donec libero est, finibus et risus sed, semper malesuada nisl. Curabitur lobortis diam at ligula lobortis porta. Praesent tortor justo, efficitur id scelerisque non, interdum vel enim. Cras pellentesque orci et lacus lacinia hendrerit. Curabitur ut mauris lacus. Quisque laoreet dui quis interdum pretium. Nulla vestibulum feugiat lacinia. Sed et tortor at velit bibendum accumsan. Nam sed arcu eu quam porta dapibus. Vestibulum feugiat sem ut dolor rutrum, non ullamcorper nisl mattis. Duis vestibulum nisi in dui volutpat, quis porttitor odio tincidunt. Morbi in justo ac sem tincidunt egestas. Integer augue turpis, mattis quis suscipit quis, pretium at ante.*/}

            {/*    Pellentesque eget est felis. Ut eu augue sapien. Fusce mollis tincidunt nisi, at tempor est interdum in. Nulla aliquam sapien eu placerat luctus. Proin sollicitudin maximus ultrices. Fusce ac erat rhoncus, congue libero et, facilisis ante. Donec ut metus sed felis malesuada vestibulum ut sed tortor. In aliquam libero sem, ac maximus felis cursus a. Suspendisse sed malesuada ante. In vel libero eu mauris fermentum molestie. Vivamus sit amet nulla id lectus efficitur aliquam. Proin vel nunc orci. Donec sed consequat nulla.*/}

            {/*    Sed lacinia, elit vel sollicitudin malesuada, lectus tellus sodales magna, ac ullamcorper lorem purus et mi. Maecenas tellus sapien, aliquet id libero vitae, venenatis malesuada mi. Fusce scelerisque pharetra velit sed placerat. Proin sit amet volutpat metus. Praesent vestibulum placerat vulputate. In dignissim dolor risus, vel interdum felis hendrerit a. Maecenas interdum lacinia luctus. Nullam commodo ultricies rhoncus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer convallis nunc in sagittis porta. Duis quam enim, bibendum non dignissim quis, lobortis in leo. Morbi orci massa, varius ac pellentesque blandit, accumsan luctus nibh. Nullam nisi nibh, tristique sed quam id, auctor tempus nibh.*/}

            {/*    Cras tempor, arcu id pharetra mollis, ante est sodales turpis, ut iaculis dui lorem eu sapien. Donec vestibulum diam eget eros finibus tempus sit amet eu ex. Aenean venenatis ultrices vestibulum. Vivamus mattis quam urna, eu condimentum libero dictum vitae. Phasellus interdum auctor egestas. Morbi suscipit convallis purus. Nam ornare vulputate magna eget mattis.*/}

            {/*    Quisque fringilla libero et erat ultrices cursus. Fusce dapibus vulputate tincidunt. Mauris luctus dolor ac bibendum consectetur. Phasellus mauris orci, lacinia et ex nec, aliquam scelerisque enim. Vestibulum non venenatis orci. Morbi bibendum ligula id diam dapibus, in consectetur augue accumsan. Vestibulum id consequat metus, vitae varius augue. Nulla consequat mauris mauris, sed hendrerit tellus sodales id. Cras tempor laoreet porttitor. Sed tincidunt sagittis tortor, at vestibulum orci condimentum a. Sed hendrerit arcu sit amet erat auctor egestas. Praesent vitae erat ullamcorper, dictum mi a, tempor leo. Nulla euismod nunc eros, at dictum enim tristique quis. Donec ut ornare sem. Integer nec metus non est mollis lacinia sit amet quis ipsum. Pellentesque aliquet accumsan leo.*/}

            {/*    Nunc vel quam at neque volutpat suscipit at vel nibh. Ut mollis lobortis urna in porta. Etiam vulputate quam vitae tortor blandit scelerisque. Vestibulum vel ipsum tincidunt, aliquet arcu ac, varius dolor. Mauris finibus vestibulum quam id faucibus. Donec non justo tincidunt, rutrum purus nec, rhoncus lacus. Proin bibendum eleifend lorem, id vulputate turpis posuere sed. Maecenas magna libero, sodales eget tellus eu, hendrerit pretium magna. Donec ultricies dolor est, vel egestas quam vestibulum eget. Curabitur facilisis, velit a tempor laoreet, nisi sem vulputate eros, eu porttitor eros enim id lorem. Fusce tempor orci augue. Phasellus consequat sit amet justo in scelerisque.*/}

            {/*    Nam sagittis vulputate aliquet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent a diam magna. Pellentesque quis faucibus dui, et pharetra eros. Donec consequat metus in nunc egestas, a semper ex elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed posuere tristique nunc vel egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam diam nunc, ornare tincidunt mattis in, elementum non dui. Ut hendrerit, enim ac tempus ultrices, libero urna aliquam elit, ac venenatis nisl nibh pretium erat. Proin hendrerit libero non magna viverra, vitae convallis nisl pellentesque. Donec at facilisis tellus. Etiam vel erat et felis mattis sollicitudin.*/}

            {/*    Donec facilisis tortor id eros pharetra vestibulum. Mauris ante lorem, ullamcorper nec magna id, posuere convallis orci. Vestibulum sollicitudin porttitor laoreet. In nec nunc est. Morbi ultrices dapibus nisl ut luctus. Praesent a sapien eros. Duis ex urna, accumsan nec tristique at, varius nec ex. Vivamus vel sodales tortor, sit amet aliquet nulla. Nullam accumsan metus vel leo gravida, in sollicitudin augue eleifend.*/}

            {/*    Nullam non commodo est. Cras dapibus sodales urna, eu facilisis lectus rhoncus vel. Sed placerat vulputate diam, at ornare lorem lacinia ut. In ac lectus eu eros feugiat congue. Quisque elementum, nibh eu pellentesque dapibus, elit ante molestie nulla, id convallis leo felis sed tortor. Vestibulum auctor est a est vulputate, posuere scelerisque ante vestibulum. Donec neque orci, egestas et lorem sit amet, dignissim ullamcorper nunc. Nam a mauris mollis, ornare urna id, congue turpis. Cras facilisis congue laoreet. Phasellus commodo, nunc quis eleifend commodo, dui nisi sagittis nisl, ac scelerisque est erat quis odio. Quisque in metus tincidunt, consectetur enim quis, feugiat leo. Sed non orci in lectus elementum feugiat. Duis porttitor turpis tellus, vel vulputate massa vulputate eu. Quisque sit amet dignissim est.*/}

            {/*    Aenean in urna justo. Etiam imperdiet tempus ipsum in elementum. Curabitur consequat dui non arcu vulputate lacinia. Phasellus commodo ac purus vel eleifend. Mauris pharetra mattis diam, vitae volutpat diam venenatis vitae. Nunc leo ex, convallis ac lacus eu, lacinia aliquam diam. Quisque metus ante, fermentum lobortis mi sed, auctor pellentesque erat. Sed dapibus, quam vitae tristique vulputate, libero quam pretium enim, sed sollicitudin lacus ipsum et lorem. Mauris vel felis non urna volutpat mollis sit amet a urna. Sed aliquam sapien efficitur, pharetra turpis nec, sodales neque. Proin semper, libero ac tempor efficitur, nulla ligula luctus nibh, ut ullamcorper sapien neque vitae tellus. Cras gravida mauris at tellus ornare maximus. Ut egestas id risus ac efficitur. Phasellus sit amet mi mauris. Curabitur accumsan ex diam, nec dictum nisl consectetur accumsan.*/}

            {/*    Donec nec justo orci. Suspendisse potenti. In non luctus odio. In porttitor non eros quis auctor. In vulputate feugiat tellus, eu lacinia velit sollicitudin non. Suspendisse ut arcu aliquam, maximus nibh nec, dictum ipsum. Proin aliquet metus id magna imperdiet, ut porttitor arcu lobortis.*/}

        </div>
    );
};

export default HomePage;