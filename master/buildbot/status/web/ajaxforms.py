from buildbot.status.web.base import HtmlResource
import buildbot
import twisted
import sys
import jinja2



class FormsResource(HtmlResource):
    pageTitle = "Build status single project"

    def content(self, req, cxt):
        cxt.update(dict(buildbot=buildbot.version, 
                               twisted=twisted.__version__,
                               jinja=jinja2.__version__, 
                               python=sys.version,
                               platform=sys.platform))




        cxt['simonPath'] = req.args
        cxt['name'] = req.args['name'][0]
        


        template = req.site.buildbot_service.templates.get_template("ajaxforms.html")
        template.autoescape = True
        return template.render(**cxt)