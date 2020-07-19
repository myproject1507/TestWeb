using BaitulMaarif.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace MVCWebApiBasicAuth.Filters
{
    public class BasicAuthenticationAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            try
            {
                if (actionContext.Request.Headers.Authorization == null)
                {
                    actionContext.Response = actionContext.Request
                        .CreateResponse(HttpStatusCode.Unauthorized);
                }
                else
                {
                    string authenticationToken = actionContext.Request.Headers
                                                .Authorization.Parameter;
                    string decodedAuthenticationToken = Encoding.UTF8.GetString(
                        Convert.FromBase64String(authenticationToken));
                    string[] usernamePasswordArray = decodedAuthenticationToken.Split(':');
                    string username = usernamePasswordArray[0];
                    string password = usernamePasswordArray[1];

                    if (Login(username, password))
                    {
                        Thread.CurrentPrincipal = new GenericPrincipal(
                            new GenericIdentity(username), null);
                    }
                    else
                    {
                        //actionContext.Response = actionContext.Request
                        //    .CreateResponse(HttpStatusCode.Unauthorized);

                        actionContext.Response = new HttpResponseMessage
                        {
                            StatusCode = HttpStatusCode.Forbidden,
                            Content = new StringContent("You are unauthorized to access this resource.")
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                actionContext.Response = actionContext.Request
                       .CreateResponse(HttpStatusCode.Unauthorized);
            }
        }

        public static bool Login(string username, string password)
        {
            try
            {
                using (baitulmaarifdbEntities entities = new baitulmaarifdbEntities())
                {
                    return entities.ApiUsers.Any(user =>
                                user.UserName.Equals(username, StringComparison.OrdinalIgnoreCase)
                                                   && user.Password == password);
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}